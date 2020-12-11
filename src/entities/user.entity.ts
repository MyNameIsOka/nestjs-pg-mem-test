/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne } from 'typeorm';

import { Account } from './account.entity';
import { Default } from './default.entity';

@Entity('User')
export class User extends Default {
  @Column({ unique: true })
  email!: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role!: string;

  @ManyToOne(
    type => Account,
    account => account.users,
    { eager: true },
  )
  account!: Account;
}
