import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDeposit } from './dto/deposit.dto';
import { Deposit } from './entities/deposit.entity';
import { DepositBalance } from './event/deposit-balance.event';
import { DepositRepository } from './repository/deposite.repository';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    @Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientKafka,
  ) {}

  async handleCreateDeposit(depositData: RequestDeposit) {
    console.log({ depositData });

    this.accountClient
      .send(
        'deposit_account_balance',
        new DepositBalance(depositData.uuid, depositData.amount),
      )
      .subscribe(async (user) => {
        console.log({ user });

        // const result = await this.depositRepository.createDeposit({
        //   userId: depositData.userId,
        //   amount: depositData.amount,
        // });
        // console.log({ depositData, result });
      });
  }
}
