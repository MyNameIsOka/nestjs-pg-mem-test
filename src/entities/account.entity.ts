/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Default } from './default.entity';
import { User } from './user.entity';

export type AccountType = 'personal' | 'business' | 'enterprise';

@Entity('Account')
export class Account extends Default {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ unique: true })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['personal', 'business', 'enterprise'],
    default: 'personal',
  })
  type!: AccountType;

  @OneToMany(
    type => User,
    user => user.account,
  )
  users!: User[];
}
