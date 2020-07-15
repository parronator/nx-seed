import { Todo } from '../../app/todoExample/domain/entities/todo';
import { HttpResponse } from '@cinch-build/core';

export interface TodoResponse {
  id: string;
  text: string;
  done: boolean;
}

export const TodoFixture: Todo = new Todo('0', 'test', false);

export const TodoHttpFixture: TodoResponse = {
  id: '0',
  text: 'test',
  done: false,
};

export const TodoListHttpFixture: HttpResponse<TodoResponse[]> = {
  data: [TodoHttpFixture],
  status: 200,
  statusText: '',
  headers: null,
  config: null,
};
