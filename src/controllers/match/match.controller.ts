import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MatchDto } from '@dto/match/match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  // TODO refactor
  @Post()
  @UseGuards(JwtAuthGuard)
  async uploadFile(@Body() createPlayerDto: MatchDto) {
    const matchId = await this.matchService.reportMatch({
      code: '',
      winner: createPlayerDto.winner,
      ratingChange: 25,
      playerXMatch: createPlayerDto.playerXMatch,
    });
    return matchId;
  }
}
