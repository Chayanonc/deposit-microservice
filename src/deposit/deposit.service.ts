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
    const balance = new Promise((resolve, reject) => {
      this.accountClient
        .send('get_user_balance', { id: depositData.account_number })
        .subscribe(async (user) => {
          //balance = parseFloat(user) + parseFloat('' + depositData.amount);

          resolve(parseFloat(user) + parseFloat('' + depositData.amount));
        });
    });

    console.log('promise balance', await balance);

    this.accountClient
      .send(
        'update_user_balance',
        //new DepositBalance(depositData.account_number, balance),
        { id: depositData.account_number, balance: await balance },
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
