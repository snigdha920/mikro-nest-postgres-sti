import { Entity, Enum, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract/abstract.entity';
import { EmployeeRepository } from './employee.repoistory';

export enum EmployeeType {
  MANAGER = 'MANAGER',
}
@Entity({
  discriminatorColumn: 'type',
  abstract: true,
  customRepository: () => EmployeeRepository,
})
export class Employee extends AbstractEntity {
  @Property()
  name!: string;

  @Enum({ items: () => EmployeeType })
  employeeType: EmployeeType;

  constructor(employeeType: EmployeeType) {
    super();
    this.employeeType = employeeType;
  }
}

@Entity({
  discriminatorValue: EmployeeType.MANAGER,
})
export class Manager extends Employee {
  @Property({
    type: Number,
    default: 1,
  })
  public managerProp = 1;

  constructor() {
    super(EmployeeType.MANAGER);
  }
}
