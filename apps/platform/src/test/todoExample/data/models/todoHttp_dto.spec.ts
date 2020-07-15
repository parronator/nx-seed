import { TodoFixture, TodoHttpFixture } from '../../todo_fixtures';
import { TodoHttpDTO } from '../../../../app/todoExample/data/models/todoHttp_dto';

describe('Todo Htto DTO', () => {
  it('should map from json', () => {
    const result = TodoHttpDTO.fromJSON(TodoHttpFixture);
    expect(result).toEqual(TodoFixture)
  })
})
