import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { MailService } from './controllers/mail/mail.service';
import { User } from './entities/user.entity';
import { UserTmp } from './entities/user-tmp.entity';
import { PlayersModule } from './controllers/players/players.module';
import { PlayersController } from './controllers/players/players.controller';
import { BalancerController } from './controllers/balancer/balancer.controller';
import { BalancerModule } from './controllers/balancer/balancer.module';
import { MatchModule } from './controllers/match/match.module';
import { MatchController } from './controllers/match/match.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [User, UserTmp],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PlayersModule,
    UserModule,
    BalancerModule,
    MatchModule,
  ],
  controllers: [AppController, AuthController, PlayersController, BalancerController, MatchController],
  providers: [AppService, MailService],
})
export class AppModule {}
