import { TodoRepository } from '../../../../app/todoExample/domain/repositories/todo_repository';

import {
  HttpResponse,
  HttpService,
  ServerException,
  ServerNotFoundException,
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
      expect(result).toEqual(tTodoList);
    });

    it('should error a ServerFailure when get list from HttpService', async () => {
      when(MockHttpService.get(anyString())).thenReturn(
        new Promise((r, rj) => rj(new ServerException()))
      );
      try {
        await repository.getList();
      } catch (e) {
        expect(e).toEqual(new ServerException());
      }
      verify(MockHttpService.get('todos')).called();
    });

    it('should error a ServerNotFoundFailure when get list from HttpService', async () => {
      when(MockHttpService.get(anyString())).thenThrow(
        new ServerNotFoundException()
      );
      try {
        await repository.getList();
      } catch (e) {
        expect(e).toEqual(new ServerNotFoundException());
      }

      verify(MockHttpService.get('todos')).called();
    });
  });
});
