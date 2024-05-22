import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '@entities/player.entity';
import { BalancerController } from './balancer.controller';
import { BalancerService } from './balancer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
  ],
  controllers: [BalancerController],
  providers: [BalancerService],
  exports: [BalancerService],
})
export class BalancerModule { }