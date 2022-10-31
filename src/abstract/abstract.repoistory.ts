import { EntityRepository } from '@mikro-orm/postgresql';
import { AbstractEntity } from './abstract.entity';

export abstract class AbstractRepository<
  Entity extends AbstractEntity = AbstractEntity,
> extends EntityRepository<Entity> {
  public delete(entity: Entity) {
    this.em.assign(entity, {
      ...entity,
      deletedAt: new Date(),
    });
  }
}
