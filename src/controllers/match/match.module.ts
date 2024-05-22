import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from '@entities/match.entity';
import { PlayerXMatch } from '@entities/player-x-match.entity';
import { Player } from '@entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, PlayerXMatch, Player]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule { }