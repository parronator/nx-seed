import { Either } from 'purify-ts';
import { Failure } from '@cinch-build/core';
import { Todo } from '../entities/todo';

export abstract class TodoRepository {
  abstract async getList(): Promise<Either<Failure, Todo[]>>;
}
