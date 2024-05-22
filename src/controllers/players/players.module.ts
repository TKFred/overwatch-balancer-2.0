import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '@entities/player.entity';
import { PlayerXMatch } from '@entities/player-x-match.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, PlayerXMatch]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule { }