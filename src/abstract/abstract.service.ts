import { RequiredEntityData } from '@mikro-orm/core';
import { AbstractEntity } from './abstract.entity';
import { AbstractRepository } from './abstract.repoistory';

export abstract class AbstractService<Entity extends AbstractEntity> {
  constructor(protected readonly repository: AbstractRepository<Entity>) {}

  protected async create(args: any): Promise<Entity> {
    let entity: Entity;
    try {
      console.log({ args });

      entity = this.repository.create({
        ...args,
      } as unknown as RequiredEntityData<Entity>);

      console.log({ entity });

      this.repository.persist(entity);
      await this.repository.flush();

      return entity;
    } catch (error) {
      throw new Error('Could not create cluster service, error: ' + error);
    }
  }
}
