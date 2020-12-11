/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToMany } from 'typeorm';

import { Default } from './default.entity';
import { User } from './user.entity';

@Entity('Account')
export class Account extends Default {
  @Column({ unique: true })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['personal', 'business', 'enterprise'],
    default: 'personal',
  })
  type!: string;

  @OneToMany(
    type => User,
    user => user.account,
  )
  users!: User[];
}
