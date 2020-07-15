import { TodoRepository } from '../../../../app/todoExample/domain/repositories/todo_repository';
import { Left, Right } from 'purify-ts';

import {
  HttpResponse,
  HttpService,
  ServerFailure,
  ServerNotFoundException,
  ServerNotFoundFailure,
} from '@cinch-build/core';

import { Todo } from '../../../../app/todoExample/domain/entities/todo';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { TodoRepositoryImpl } from '../../../../app/todoExample/data/repositories/todo_repository_impl';
import {
  TodoFixture,
  TodoListHttpFixture,
  TodoResponse,
} from '../../todo_fixtures';

const MockHttpService = mock<HttpService>();

describe('Todo Repository', () => {
  let repository: TodoRepository;
  let httpService: HttpService;

  const tTodoList: Todo[] = [TodoFixture];
  const tResponse: HttpResponse<TodoResponse[]> = TodoListHttpFixture;

  beforeEach(() => {
    httpService = instance(MockHttpService);
    repository = new TodoRepositoryImpl(httpService);
  });

  describe('getList', () => {
    it('should get list from HttpService', async () => {
      when(MockHttpService.get(anyString())).thenReturn(
        new Promise((r) => r(tResponse))
      );
      const result = await repository.getList();
      expect(result).toEqual(Right(tTodoList));
      verify(MockHttpService.get('todos')).called();
    });

    it('should error a ServerFailure when get list from HttpService', async () => {
      when(MockHttpService.get(anyString())).thenReturn(
        new Promise((r, rj) => rj())
      );
      const result = await repository.getList();
      expect(result).toEqual(Left(new ServerFailure()));
      verify(MockHttpService.get('todos')).called();
    });

    it('should error a ServerNotFoundFailure when get list from HttpService', async () => {
      when(MockHttpService.get(anyString())).thenThrow(
        new ServerNotFoundException()
      );
      const result = await repository.getList();
      expect(result).toEqual(Left(new ServerNotFoundFailure()));
      verify(MockHttpService.get('todos')).called();
    });
  });
});
