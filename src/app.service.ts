import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Director, Employee, Manager } from './employee/employee.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    await this.createAndUpdateSchema();
  }

  private async createAndUpdateSchema() {
    const orm = await MikroORM.init<PostgreSqlDriver>({
      dbName: 'postgresdb',
      user: 'postgres',
      password: 'lol',
      host: 'localhost',
      port: 5432,
      type: 'postgresql',
      entities: [Employee, Manager, Director],
      debug: true,
      migrations: {
        tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: true, // allow to disable table and column dropping
        snapshot: true, // save snapshot when creating new migrations
        emit: 'ts', // migration generation mode
      },
    });

    const generator = orm.getSchemaGenerator();

    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();

    await generator.refreshDatabase(); // ensure db exists and is fresh

    await orm.close(true);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
