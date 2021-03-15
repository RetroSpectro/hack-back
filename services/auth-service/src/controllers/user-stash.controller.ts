import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserStash} from '../models';
import {UserStashRepository} from '../repositories';

export class UserStashController {
  constructor(
    @repository(UserStashRepository)
    public userStashRepository : UserStashRepository,
  ) {}

  @post('/user-stashes')
  @response(200, {
    description: 'UserStash model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserStash)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserStash, {
            title: 'NewUserStash',
            exclude: ['id'],
          }),
        },
      },
    })
    userStash: Omit<UserStash, 'id'>,
  ): Promise<UserStash> {
    return this.userStashRepository.create(userStash);
  }

  @get('/user-stashes/count')
  @response(200, {
    description: 'UserStash model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserStash) where?: Where<UserStash>,
  ): Promise<Count> {
    return this.userStashRepository.count(where);
  }

  @get('/user-stashes')
  @response(200, {
    description: 'Array of UserStash model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserStash, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserStash) filter?: Filter<UserStash>,
  ): Promise<UserStash[]> {
    return this.userStashRepository.find(filter);
  }

  @patch('/user-stashes')
  @response(200, {
    description: 'UserStash PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserStash, {partial: true}),
        },
      },
    })
    userStash: UserStash,
    @param.where(UserStash) where?: Where<UserStash>,
  ): Promise<Count> {
    return this.userStashRepository.updateAll(userStash, where);
  }

  @get('/user-stashes/{id}')
  @response(200, {
    description: 'UserStash model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserStash, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserStash, {exclude: 'where'}) filter?: FilterExcludingWhere<UserStash>
  ): Promise<UserStash> {
    return this.userStashRepository.findById(id, filter);
  }

  @patch('/user-stashes/{id}')
  @response(204, {
    description: 'UserStash PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserStash, {partial: true}),
        },
      },
    })
    userStash: UserStash,
  ): Promise<void> {
    await this.userStashRepository.updateById(id, userStash);
  }

  @put('/user-stashes/{id}')
  @response(204, {
    description: 'UserStash PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userStash: UserStash,
  ): Promise<void> {
    await this.userStashRepository.replaceById(id, userStash);
  }

  @del('/user-stashes/{id}')
  @response(204, {
    description: 'UserStash DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userStashRepository.deleteById(id);
  }
}
