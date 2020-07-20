import { Todo } from '../entities/todo';

export abstract class TodoRepository {
  abstract async getList(): Promise<Todo[]>;
  abstract async create(text: string): Promise<Todo>;
}
