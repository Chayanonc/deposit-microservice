import { Body, Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { DepositService } from './deposit.service';
import { RequestDeposit } from './dto/deposit.dto';

@Controller('deposit')
export class DepositController implements OnModuleInit {
  constructor(
    private readonly depositService: DepositService,
    @Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientKafka,
  ) {}

  @EventPattern('request-deposit-create')
  createRequestDeposit(@Body() depositDto: RequestDeposit) {
    this.depositService.handleCreateDeposit(depositDto);
  }

  onModuleInit() {
    this.accountClient.subscribeToResponseOf('deposit_account_balance');
  }
}
