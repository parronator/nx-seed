import { DomainException, NoParams, Params, UseCase } from '@cinch-build/core';
import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todo_repository';
import { TodoRepositoryImpl } from '../../data/repositories/todo_repository_impl';

export class CreateTodoUsecase implements UseCase<Todo, CreateTodoParams> {
  constructor(private repository: TodoRepository = new TodoRepositoryImpl()) {}

  async call(params: CreateTodoParams): Promise<Todo> {
    return this.repository.create(params.text);
  }
}

export class CreateTodoParams implements Params {
  constructor(public text: string) {
    if(text.length < 1) throw new DomainException()
  }
}
