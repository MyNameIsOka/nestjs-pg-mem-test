import { Connection, Repository } from 'typeorm';

import { TempDB } from './test.db';
import { Account } from '../src/entities/account.entity';
import { User } from '../src/entities/user.entity';

describe('EntityTest', () => {
  let connection: Connection;
  let account: Repository<Account>;
  let user: Repository<User>;

  beforeAll(async () => {
    connection = await TempDB([Account, User]);
    account = connection.getRepository(Account);
    user = connection.getRepository(User);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should create entity repos', () => {
    expect(account).toBeDefined();
    expect(user).toBeDefined();
  });
});
