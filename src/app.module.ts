import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Director, Employee, Manager } from './employee/employee.entity';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [],
      useFactory: () => ({
        dbName: 'postgresdb',
        user: 'postgres',
        password: 'lol',
        host: 'localhost',
        port: 5432,
        type: 'postgresql',
        entities: [Employee, Manager, Director],
        debug: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
