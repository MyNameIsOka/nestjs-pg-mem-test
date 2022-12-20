import { Connection, Repository } from 'typeorm';

import { TempDB } from './test.db';
import { Account, AccountType } from '../src/entities/account.entity';
import { User, UserRoles } from '../src/entities/user.entity';

describe('EntityTest', () => {
  let connection: Connection;
  let account: Repository<Account>;
  let user: Repository<User>;

  beforeEach(async () => {
    connection = await TempDB([Account, User]);
    account = connection.getRepository(Account);
    user = connection.getRepository(User);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should create entity repos', () => {
    expect(account).toBeDefined();
    expect(user).toBeDefined();
  });

  it('should create an account', async () => {
    const stub = {
      name: 'test',
      type: 'business' as AccountType,
    };
    const acct = account.create(stub);
    expect(acct).toBeDefined();

    const result = await account.save(acct);
    expect(result).toHaveProperty('id');
  });

  it('should create a user', async () => {
    const stub = {
      email: 'test@domain.com',
      account: account.create({ name: 'test' }),
      roles: ['SIGNER'] as UserRoles[],
    };
    stub.account = await account.save(stub.account);

    const usr = user.create(stub);
    expect(usr).toBeDefined();

    const result = await user.save(usr);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result.account).toEqual(stub.account);
  });

  it('should find a user by email', async () => {
    const stub = {
      email: 'test@domain.com',
      account: await account.save(account.create({ name: 'test' })),
      roles: ['SIGNER'] as UserRoles[],
    };
    const usr = await user.save(user.create(stub));
    expect(usr).toBeDefined();

    const found = await user.findOne({ where: {email: usr.email}})

    console.log("found", found)

    expect(found).toBeDefined()
    expect(found.id).toEqual(usr.id)
  });
});
