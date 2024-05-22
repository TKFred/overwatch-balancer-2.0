import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, UseFilters } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from '@dto/player/create-player.dto';
import { Player } from '@entities/player.entity';
import { GetPlayerDto } from '@dto/player/get-player.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePlayerDto } from '@dto/player/update-player.dto';
import { PlayerExceptionFilter } from './exception-filters/player-exception-filter';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new PlayerExceptionFilter())
  async createOne(@Body() createPlayerDto: CreatePlayerDto): Promise<GetPlayerDto> {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new PlayerExceptionFilter())
  async updateOne(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<GetPlayerDto> {
    return await this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Get()
  async getAll(): Promise<GetPlayerDto[]> {
    return await this.playersService.getPlayers();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return await this.playersService.getPlayer(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new PlayerExceptionFilter())
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.playersService.deletePlayer(id);
  }
}
