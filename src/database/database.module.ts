import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (congfigService: ConfigService) => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: '' + process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}