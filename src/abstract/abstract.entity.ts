import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class AbstractEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;
}
