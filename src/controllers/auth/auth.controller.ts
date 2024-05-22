import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserTmpDto } from 'src/dto/user-tmp/user-tmp.dto';
import { UseFilters } from '@nestjs/common';
import { FinishRegisterDto } from '@dto/finish-register/finish-register.dto';
import { SmtpExceptionFilter } from './exception-filters/smtp-exception-filter';
import { RegistrationExceptionFilter } from './exception-filters/registration-exception-filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseFilters(new SmtpExceptionFilter())
  async register(@Body() userDto: UserTmpDto) {
    return this.authService.register(userDto);
  }

  @Post('finish-register')
  @UseFilters(new RegistrationExceptionFilter())
  async finishRegister(@Body() finishRegisterDto: FinishRegisterDto) {
    return this.authService.finishRegister(finishRegisterDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}