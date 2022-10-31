import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Module({
  imports: [MikroOrmModule.forFeature([Employee])],
  providers: [EmployeeService],
})
export class EmployeeModule {}
