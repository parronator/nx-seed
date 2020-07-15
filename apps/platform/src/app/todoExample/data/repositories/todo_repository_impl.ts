import { TodoRepository } from '../../domain/repositories/todo_repository';
import {
  AxiosService,
  Failure,
  HttpService,
  ServerFailure,
  ServerNotFoundException,
  ServerNotFoundFailure,
} from '@cinch-build/core';
import { Either, Left, Right } from 'purify-ts';
import { Todo } from '../../domain/entities/todo';
import { TodoHttpDTO } from '../models/todoHttp_dto';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private httpService: HttpService = new AxiosService()) {}

  async getList(): Promise<Either<Failure, Todo[]>> {
    try {
      const response = await this.httpService.get('todos');
      return Right(response.data.map((e) => TodoHttpDTO.fromJSON(e)));
    } catch (e) {
      if (e instanceof ServerNotFoundException) {
        return Left(new ServerNotFoundFailure());
      }
      return Left(new ServerFailure());
    }
  }
}
