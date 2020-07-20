import { TodoRepository } from '../../domain/repositories/todo_repository';
import { HttpService } from '@cinch-build/core';
import { Todo } from '../../domain/entities/todo';
import { TodoHttpDTO } from '../models/todoHttp_dto';
import { RemoteService } from '../../../shared/data/remote_service';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private httpService: HttpService = new RemoteService()) {}

  async getList(): Promise<Todo[]> {
    const response = await this.httpService.get('todos');
    return response.data.map((e) => TodoHttpDTO.fromJSON(e));
  }
}
