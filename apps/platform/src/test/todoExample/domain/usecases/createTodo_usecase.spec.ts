import { instance, mock, verify, when } from 'ts-mockito';
import { NoParams, ServerException } from '@cinch-build/core';
import { Todo } from '../../../../app/todoExample/domain/entities/todo';
import { TodoRepository } from '../../../../app/todoExample/domain/repositories/todo_repository';
import { GetTodoListUsecase } from '../../../../app/todoExample/domain/usecases/getTodoList_usecase';
import {
  CreateTodoParams,
  CreateTodoUsecase,
} from '../../../../app/todoExample/domain/usecases/createTodo_usecase';

const tTodo: Todo = new Todo('0', 'test', false);

const MockTodoRepository = mock<TodoRepository>();

describe('Create Todo', () => {
  let usecase: CreateTodoUsecase;
  let repository: TodoRepository;

  beforeEach(() => {
    repository = instance(MockTodoRepository);
    usecase = new CreateTodoUsecase(repository);
  });

  it('should create todo with repository', async () => {
    when(MockTodoRepository.create('test')).thenResolve(tTodo);
    const response = await usecase.call(new CreateTodoParams('test'));
    expect(response).toEqual(tTodo);
    verify(MockTodoRepository.create('test')).called();
  });

  it('should error when create todo with repository fails', async () => {
    const error = new ServerException();
    when(MockTodoRepository.create('test')).thenReject(error);
    try {
      await usecase.call(new CreateTodoParams('test'));
    } catch (e) {
      expect(e).toEqual(error);
    }
    verify(MockTodoRepository.create('test')).called();
  });
});
