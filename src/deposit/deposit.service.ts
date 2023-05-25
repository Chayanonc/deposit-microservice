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
    // console.log({ depositData });
    // const result = await this.depositRepository.createDeposit({
    //   ...depositData,
    // });
    // console.log({ depositData, result });
    let balance;

    this.accountClient
      .send('get_user_balance', { uuid: depositData.uuid })
      .subscribe(async (user) => {
        balance = user.balance;
      });

    this.accountClient
      .send(
        'update_balance',
        new DepositBalance(
          depositData.uuid,
          parseFloat(balance) + parseFloat('' + depositData.amount),
        ),
      )
      .subscribe(async (user) => {
        console.log({ user });
        const result = await this.depositRepository.createDeposit({
          ...depositData,
        });
        console.log({ result });
      });
  }
}
