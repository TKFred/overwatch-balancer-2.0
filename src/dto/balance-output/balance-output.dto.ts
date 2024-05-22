import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GetPlayerDto } from '@dto/player/get-player.dto';

export class BalanceOutputDto {
    @IsInt()
    SRDiff: number;

    @ValidateNested()
    @Type(() => TeamDTO)
    team1: TeamDTO;

    @ValidateNested()
    @Type(() => TeamDTO)
    team2: TeamDTO;
}

class TeamDTO {
    @ValidateNested()
    @Type(() => GetPlayerDto)
    tank: GetPlayerDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GetPlayerDto)
    dps: GetPlayerDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GetPlayerDto)
    support: GetPlayerDto[];
}