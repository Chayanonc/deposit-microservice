import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  deposit_id: number;

  @Column()
  uuid: string;

  @Column()
  amount: number;

  @Column()
  transaction_type: string;

  @Column()
  account_number: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
