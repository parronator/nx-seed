import { Todo } from '../../domain/entities/todo';

export class TodoHttpDTO {
  static fromJSON(json: { [key: string]: any }): Todo {
    return new Todo(json.id, json.text, json.completed);
  }
}
