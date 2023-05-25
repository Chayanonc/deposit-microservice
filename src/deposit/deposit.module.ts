import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { DepositRepository } from './repository/deposite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deposit]),
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'account-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [DepositController],
  providers: [DepositService, DepositRepository],
})
export class DepositModule {}
