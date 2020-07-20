import { instance, mock, verify, when } from 'ts-mockito';
import { NoParams, ServerException } from '@cinch-build/core';
import { Todo } from '../../../../app/todoExample/domain/entities/todo';
import { TodoRepository } from '../../../../app/todoExample/domain/repositories/todo_repository';
import { GetTodoListUsecase } from '../../../../app/todoExample/domain/usecases/getTodoList_usecase';

const tTodoList: Todo[] = [new Todo('0', 'test', false)];

const MockTodoRepository = mock<TodoRepository>();

describe('Get Todo List', () => {
  let usecase: GetTodoListUsecase;
  let repository: TodoRepository;

  beforeEach(() => {
    repository = instance(MockTodoRepository);
    usecase = new GetTodoListUsecase(repository);
  });

  it('should get todo list from repository', async () => {
    when(MockTodoRepository.getList()).thenResolve(tTodoList);
    const response = await usecase.call(new NoParams());
    expect(response).toEqual(tTodoList);
  });

  it('should error when get todo list from repository', async () => {
    const error = new ServerException();
    when(MockTodoRepository.getList()).thenReject(error);
    try {
      await usecase.call(new NoParams());
    } catch (e) {
      expect(e).toEqual(error);
    }
    verify(MockTodoRepository.getList()).called();
  });
});
