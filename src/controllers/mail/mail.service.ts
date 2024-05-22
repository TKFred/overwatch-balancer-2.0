import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from '@dto/send-mail/send-mail.dto';

@Injectable()
export class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465 ,
            secure: true,
            auth: {
                user: 'owbalancer@mail.ru',
                pass: '5eg9xjHBJJseAMe45xKZ',
            },
        });
    }

    async sendMail(sendMailDto: SendMailDto): Promise<void> {
        const mailOptions = {
            from: 'owbalancer@mail.ru',
            to: sendMailDto.to,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            html: sendMailDto.html,
        };

        try {
            const emailStatus =  await this.transporter.sendMail(mailOptions);
            if (emailStatus?.accepted?.length > 0) {
                return emailStatus.response;
            }
        } catch (err) {
            throw err;
        }
    }
}