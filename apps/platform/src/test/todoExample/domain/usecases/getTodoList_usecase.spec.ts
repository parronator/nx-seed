import { instance, mock, verify, when } from 'ts-mockito';
import { NoParams, ServerFailure } from '@cinch-build/core';
import { Left, Right } from 'purify-ts';
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
    when(MockTodoRepository.getList()).thenResolve(Right(tTodoList));
    const response = await usecase.call(new NoParams());
    expect(response).toEqual(Right(tTodoList));
    verify(MockTodoRepository.getList()).called();
  });

  it('should error when get todo list from repository', async () => {
    const error = new ServerFailure();
    when(MockTodoRepository.getList()).thenResolve(Left(error));
    const response = await usecase.call(new NoParams());
    expect(response).toEqual(Left(error));
    verify(MockTodoRepository.getList()).called();
  });
});
