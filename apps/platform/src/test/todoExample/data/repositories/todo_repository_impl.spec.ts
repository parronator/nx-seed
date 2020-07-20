import { TodoRepository } from '../../../../app/todoExample/domain/repositories/todo_repository';

import {
  HttpResponse,
  HttpService,
  ServerException,
  ServerNotFoundException,
} from '@cinch-build/core';

import { Todo } from '../../../../app/todoExample/domain/entities/todo';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';
import { TodoRepositoryImpl } from '../../../../app/todoExample/data/repositories/todo_repository_impl';
import {
  CreateTodoHttpFixture,
  TodoFixture,
  TodoListHttpFixture,
  TodoResponse
} from '../../todo_fixtures';

const MockHttpService = mock<HttpService>();
const tTodo = new Todo('0', 'test', false);

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
      verify(MockHttpService.get('todos')).called();
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

  describe('create', () => {
    it('should create with HttpService', async () => {
      when(MockHttpService.post(anyString(), anything())).thenReturn(
        new Promise((r) => r(CreateTodoHttpFixture))
      );
      const result = await repository.create('test');
      expect(result).toEqual(tTodo);
      // verify(MockHttpService.post('todos', {text: 'test'})).called();
    });

    it('should error a ServerFailure when create with HttpService', async () => {
      when(MockHttpService.get(anyString())).thenReturn(
        new Promise((r, rj) => rj(new ServerException()))
      );
      try {
        await repository.create('test');
      } catch (e) {
        expect(e).toEqual(new ServerException());
      }
      // verify(MockHttpService.post('todos', {text: 'test'} )).called();
    });

    it('should error a ServerNotFoundFailure when create with HttpService', async () => {
      when(MockHttpService.get(anyString())).thenThrow(
        new ServerNotFoundException()
      );
      try {
        await repository.create('text');
      } catch (e) {
        expect(e).toEqual(new ServerNotFoundException());
      }

      // verify(MockHttpService.post('todos', {text: 'test'} )).called();
    });
  });
});
