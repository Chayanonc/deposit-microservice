import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), DepositModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
