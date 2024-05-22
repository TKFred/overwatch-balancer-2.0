import { Injectable, Logger, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerXMatch } from '@entities/player-x-match.entity';
import { Match } from '@entities/match.entity';
import { MatchDto } from 'src/dto/match/match.dto';
import { Player } from '@entities/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(PlayerXMatch)
    private playerXMatchRepository: Repository<PlayerXMatch>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) { }

  // TODO refactor
  async reportMatch(matchDto: MatchDto) {
    const matchInfo = await this.matchRepository.save({
      code: matchDto.code,
      winner: matchDto.winner,
      ratingChange: matchDto.ratingChange,
    })

    for (let i = 0; i < matchDto.playerXMatch.length; ++i) {
      await this.playerXMatchRepository.save({
        playerId: matchDto.playerXMatch[i].playerId,
        matchId: matchInfo.id,
        team: matchDto.playerXMatch[i].team,
        role: matchDto.playerXMatch[i].role
      })
    }

    for (let i = 0; i < matchDto.playerXMatch.length; ++i) {
      const exists = await this.playerRepository.findOne({
        where: {
          id: matchDto.playerXMatch[i].playerId
        }
      })

      let player = {
        id: matchDto.playerXMatch[i].playerId,
        ...exists
      }

      const ratingChange = matchDto.playerXMatch[i].team == matchDto.winner ? matchDto.ratingChange : -matchDto.ratingChange;

      if (matchDto.playerXMatch[i].role == 'tank') {
        player.tankRating += ratingChange;
      } else if (matchDto.playerXMatch[i].role == 'dps') {
        player.dpsRating += ratingChange;
      } else if (matchDto.playerXMatch[i].role == 'support') {
        player.supportRating += ratingChange;
      }

      await this.playerRepository.save(player);
    }
    return matchInfo.id;
  }
}
