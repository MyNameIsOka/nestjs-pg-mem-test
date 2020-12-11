import { newDb } from 'pg-mem';

export async function TempDB(entities: any[]): Promise<any> {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities,
  });
  await connection.synchronize();

  return connection;
}
