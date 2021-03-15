import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {UserStash, UserStashRelations} from '../models';

export class UserStashRepository extends DefaultCrudRepository<
  UserStash,
  typeof UserStash.prototype.id,
  UserStashRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(UserStash, dataSource);
  }
}
