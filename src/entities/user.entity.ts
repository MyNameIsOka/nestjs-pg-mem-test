/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from './account.entity';
import { Default } from './default.entity';

export type UserType = 'user' | 'admin';
export enum UserRoles {
  ADMIN = 'ADMIN',
  SIGNER = 'SIGNER',
}
@Entity('User')
export class User extends Default {
  @PrimaryGeneratedColumn()
  public id: string;
  
  @Column({ unique: true })
  email!: string;

  @Column({
    type: 'enum',
    array: true,
    enum: UserRoles,
  })
  roles!: UserRoles[];

  @ManyToOne(
    type => Account,
    account => account.users,
    { eager: true },
  )
  account!: Account;
}
