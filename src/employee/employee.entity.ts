import { Entity, Enum, OptionalProps, Property } from '@mikro-orm/core';
import { AbstractEntity } from '../abstract/abstract.entity';
import { EmployeeRepository } from './employee.repoistory';

export enum EmployeeType {
  MANAGER = 'MANAGER',
  DIRECTOR = 'DIRECTOR',
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
  [OptionalProps]: 'managerProp';

  @Property({
    type: Number,
    default: 1,
  })
  public managerProp = 1;

  constructor() {
    super(EmployeeType.MANAGER);
  }
}

@Entity({
  discriminatorValue: EmployeeType.DIRECTOR,
})
export class Director extends Employee {
  [OptionalProps]: 'directorProp';

  @Property({
    type: Number,
    default: 1,
  })
  public directorProp = 1;

  constructor() {
    super(EmployeeType.DIRECTOR);
  }
}
