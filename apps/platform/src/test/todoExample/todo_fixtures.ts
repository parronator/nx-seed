import { Todo } from '../../app/todoExample/domain/entities/todo';
import { HttpResponse } from '@cinch-build/core';

export interface TodoResponse {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoFixture: Todo = new Todo('0', 'test', false);

export const TodoHttpFixture: TodoResponse = {
  id: '0',
  text: 'test',
  completed: false,
};

export const TodoListHttpFixture: HttpResponse<TodoResponse[]> = {
  data: [TodoHttpFixture],
  status: 200,
  statusText: '',
  headers: null,
  config: null,
};

export const CreateTodoHttpFixture: HttpResponse<TodoResponse> = {
  data: TodoHttpFixture,
  status: 200,
  statusText: '',
  headers: null,
  config: null,
};
