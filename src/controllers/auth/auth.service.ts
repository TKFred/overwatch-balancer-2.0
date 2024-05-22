import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { UserTmp } from '@entities/user-tmp.entity';
import { MailService } from '../mail/mail.service';
import { UserTmpDto } from '@dto/user-tmp/user-tmp.dto';
import { FinishRegisterDto } from '@dto/finish-register/finish-register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserTmp)
    private userTmpRepository: Repository<UserTmp>,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(pass, user.passHash)) {
      const { passHash, ...result } = user;
      return result;
    }
    return null;
  }

  async register(userDto: UserTmpDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const registrationCode = Math.floor(100000 + Math.random() * 900000);

    try {
      await this.mailService.sendMail({
        to: userDto.email,
        subject: 'Registration Code',
        text: `Your registration code is: ${registrationCode}. Enter this code to finish registration.`,
      });
    } catch (err) {
      throw err;
    }

    await this.userTmpRepository
      .createQueryBuilder()
      .delete()
      .from(UserTmp)
      .where('name = :name', { name: userDto.name })
      .orWhere('email = :email', { email: userDto.email })
      .execute();

    const createdUserTmp = await this.userTmpRepository.save({
      name: userDto.name,
      email: userDto.email,
      passHash: hashedPassword,
      registrationCode,
    });

    return { id: createdUserTmp.id };
  }

  async finishRegister(finishRegisterDto: FinishRegisterDto) {
    const tmpUser = await this.userTmpRepository.findOne({ where: { id: finishRegisterDto.id } });

    if (!tmpUser) {
      throw new Error('404 user not found');
    }

    if (tmpUser.registrationCode !== finishRegisterDto.code) {
      throw new Error('400 invalid code');
    }

    await this.userTmpRepository.delete(finishRegisterDto.id);

    const newUser = this.userRepository.create({
      name: tmpUser.name,
      email: tmpUser.email,
      passHash: tmpUser.passHash,
    });

    return await this.userRepository.save(newUser);
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}