import { Injectable } from '@nestjs/common';
import { Player } from '@entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { BalanceInputDto } from '@dto/balance-input/balance-input.dto';
import { BalancerResult } from './balancer-result.interface';
import { BalancerPreferences } from './balancer-preferences.interface';
import { BalanceOutputDto } from '@dto/balance-output/balance-output.dto';

@Injectable()
export class BalancerService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) { }

  async balance(input: BalanceInputDto): Promise<BalanceOutputDto> {
    const players = this.randomShuffle(
      await this.playersRepository.find({
        where: {
          id: In(input.playersArray)
        }
      })
    );

    const output = {
      bestSRDiff: Number.MAX_SAFE_INTEGER,
      playerIndexes: new Array(10).fill(null)
    };

    const preferences = {
      team1: input.preferences1,
      team2: input.preferences2,
    }

    this.tryBalance(players, 0, new Array(10).fill(null), preferences, output);

    if (output.bestSRDiff === Number.MAX_SAFE_INTEGER) {
      return null;
    }

    return {
      SRDiff: output.bestSRDiff,
      team1: {
        tank: players[output.playerIndexes[0]],
        dps: [
          players[output.playerIndexes[1]],
          players[output.playerIndexes[2]],
        ],
        support: [
          players[output.playerIndexes[3]],
          players[output.playerIndexes[4]],
        ],
      },
      team2: {
        tank: players[output.playerIndexes[5]],
        dps: [
          players[output.playerIndexes[6]],
          players[output.playerIndexes[7]],
        ],
        support: [
          players[output.playerIndexes[8]],
          players[output.playerIndexes[9]],
        ],
      }
    }
  }

  randomShuffle(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  tryBalance(input: Array<Player>, currentPlayerIndex: number, balance: Array<number>, preferences: BalancerPreferences, result: BalancerResult) {
    if (currentPlayerIndex == 10) {
      const SR1 = input[balance[0]].tankRating + input[balance[1]].dpsRating + input[balance[2]].dpsRating + input[balance[3]].supportRating + input[balance[4]].supportRating;
      const SR2 = input[balance[5]].tankRating + input[balance[6]].dpsRating + input[balance[7]].dpsRating + input[balance[8]].supportRating + input[balance[9]].supportRating;
      const SRDiff = Math.abs(SR1 - SR2);
      if (SRDiff < result.bestSRDiff) {
        for (let i = 0; i < result.playerIndexes.length; i++) {
          result.playerIndexes[i] = balance[i];
        }
        result.bestSRDiff = SRDiff;
      }
      return;
    }

    for (let seedIndex = 0; seedIndex < 10; ++seedIndex) {
      if (balance[seedIndex] == null && this.checkMask(seedIndex, input[currentPlayerIndex]) && this.checkPreferences(seedIndex, input[currentPlayerIndex], preferences)) {
        balance[seedIndex] = currentPlayerIndex;
        this.tryBalance(input, currentPlayerIndex + 1, balance, preferences, result);
        balance[seedIndex] = null;
      }
    }
  }

  checkPreferences(seedIndex: number, player: Player, preferences: BalancerPreferences): boolean {
    if (preferences.team1.includes(player.id) && ![0, 1, 2, 3, 4].includes(seedIndex)) return false;
    if (preferences.team2.includes(player.id) && ![5, 6, 7, 8, 9].includes(seedIndex)) return false;
    return true;
  }

  checkMask(seedIndex: number, player: Player): boolean {
    if (player.rolesMask[0] == '1' && [0, 5].includes(seedIndex)) return true;
    if (player.rolesMask[1] == '1' && [1, 2, 6, 7].includes(seedIndex)) return true;
    if (player.rolesMask[2] == '1' && [3, 4, 8, 9].includes(seedIndex)) return true;
    return false;
  }
}
