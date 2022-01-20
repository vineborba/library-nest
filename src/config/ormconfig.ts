import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'vini123',
  database: 'library',
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/../db/migrations/*.{ts,js}'],
  cli: {
    entitiesDir: path.resolve('src', 'entities'),
    migrationsDir: path.resolve('src', 'db', 'migrations'),
  },
};

export default ormconfig;
