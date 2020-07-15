import { Todo } from '../../../../app/todoExample/domain/entities/todo';

describe('Todo', () => {
  const tTodo = new Todo('0', 'test', false);

  it('should have an id', () => {
    expect(tTodo.id).toEqual('0');
  });

  it('should have a text', () => {
    expect(tTodo.text).toEqual('test');
  });

  it('should be not completed', () => {
    expect(tTodo.isCompleted()).toEqual(false);
  });
});
