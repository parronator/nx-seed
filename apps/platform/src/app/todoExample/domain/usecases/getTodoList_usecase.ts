import { Failure, NoParams, UseCase } from '@cinch-build/core';
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo_repository';
import { Either } from 'purify-ts';
import { TodoRepositoryImpl } from '../../data/repositories/todo_repository_impl';

export class GetTodoListUsecase implements UseCase<Todo[], NoParams> {
  constructor(private repository: TodoRepository = new TodoRepositoryImpl()) {}

  async call(params: NoParams): Promise<Either<Failure, Todo[]>> {
    return this.repository.getList();
  }
}
