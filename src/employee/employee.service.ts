import { InjectRepository } from '@mikro-orm/nestjs';
import { AbstractService } from '../abstract/abstract.service';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repoistory';

export class EmployeeService extends AbstractService<Employee> {
  constructor(@InjectRepository(Employee) repository: EmployeeRepository) {
    super(repository);
  }
}
