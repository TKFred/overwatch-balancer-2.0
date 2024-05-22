import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch(Error)
export class RegistrationExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception.message.includes('404 user not found')) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Пользователь не найден.';
        }

        if (exception.message.includes('400 invalid code')) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Неверный код регистрации. Проверьте код в письме в вашем почтовом ящике.';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}