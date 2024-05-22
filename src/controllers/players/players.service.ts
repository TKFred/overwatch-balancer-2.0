import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from '@dto/player/create-player.dto';
import { UpdatePlayerDto } from '@dto/player/update-player.dto';
import { GetPlayerDto } from '@dto/player/get-player.dto';
import { Player } from '@entities/player.entity';
import { PlayerXMatch } from '@entities/player-x-match.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(PlayerXMatch)
    private playerXMatchRepository: Repository<PlayerXMatch>,
  ) { }

  async createPlayer(player: CreatePlayerDto): Promise<GetPlayerDto> {
    return await this.playersRepository.save(player);
  }

  async updatePlayer(id: number, player: UpdatePlayerDto): Promise<GetPlayerDto> {
    if (!id) {
      throw new NotFoundException();
    }

    const exists = await this.playersRepository.findOne({
      where: {
        id
      }
    })

    if (!exists) {
      throw new NotFoundException();
    }

    return await this.playersRepository.save({
      id,
      ...player,
    })
  }

  async getPlayers(): Promise<GetPlayerDto[]> {
    const playerXMatches = await this.playerXMatchRepository.find();

    const matches = [];

    playerXMatches.map((playerXMatches) => {
      matches[playerXMatches.playerId] = matches[playerXMatches.playerId] ? matches[playerXMatches.playerId] + 1 : 1;
    })

    const players = await this.playersRepository.find();

    const res = players.map((player) => { return { ...player, matchesCount: matches[player.id] ?? 0 } })
      .sort((a, b) => a.matchesCount < b.matchesCount ? 1 : -1);

    return res;
  }

  async getPlayer(id: number): Promise<Player> {
    return await this.playersRepository.findOne({
      where: {
        id
      }
    })
  }

  async deletePlayer(id: number): Promise<void> {
    const res = await this.playersRepository.delete(id);

    if (!res.affected) {
      throw new NotFoundException();
    }
  }
}
