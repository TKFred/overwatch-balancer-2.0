import { Controller, Post, Body } from '@nestjs/common';
import { BalancerService } from './balancer.service';
import { BalanceInputDto } from '@dto/balance-input/balance-input.dto';
import { BalanceOutputDto } from '@dto/balance-output/balance-output.dto';

@Controller('balancer')
export class BalancerController {
  constructor(private readonly balancerService: BalancerService) { }

  @Post()
  async balance(@Body() balanceInputDto: BalanceInputDto): Promise<BalanceOutputDto> {
    return await this.balancerService.balance(balanceInputDto);
  }
}
