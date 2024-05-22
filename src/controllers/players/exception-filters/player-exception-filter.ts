import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, UnauthorizedException } from '@nestjs/common';

@Catch(Error)
export class PlayerExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof UnauthorizedException) {
            status = HttpStatus.UNAUTHORIZED;
            message = 'unauthorized';
          }

        if (exception.message.includes('battletag_unique')) {
            status = HttpStatus.CONFLICT;
            message = 'Игрок с указанным баттл-тэгом уже есть в системе';
        }

        if (exception.message.includes('Not Found')) {
            status = HttpStatus.CONFLICT;
            message = 'Игрок с указанным id не найден';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}