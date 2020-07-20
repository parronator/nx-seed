import { Todo } from '../entities/todo';

export abstract class TodoRepository {
  abstract async getList(): Promise<Todo[]>;
}
