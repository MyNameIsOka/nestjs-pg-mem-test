import { DataType, newDb } from 'pg-mem';

export async function TempDB(entities: any[]): Promise<any> {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    name: 'current_database',
    args: [],
    returns: DataType.text,
    implementation: (x) => `hello world: ${x}`,
  });

  db.public.registerFunction({
    name: 'version',
    args: [],
    returns: DataType.text,
    implementation: () => 'PostgreSQL 14.2, compiled by Visual C++ build 1914, 64-bit',
  });

  const connection = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities,
  });

  await connection.initialize();

  await connection.synchronize();

  return connection;
}
