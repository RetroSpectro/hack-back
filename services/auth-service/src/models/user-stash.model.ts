import {Entity, model, property} from '@loopback/repository';

@model()
export class UserStash extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  stash: string[];


  constructor(data?: Partial<UserStash>) {
    super(data);
  }
}

export interface UserStashRelations {
  // describe navigational properties here
}

export type UserStashWithRelations = UserStash & UserStashRelations;
