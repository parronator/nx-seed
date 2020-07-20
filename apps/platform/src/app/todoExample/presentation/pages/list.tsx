import React, { useEffect } from 'react';

import './list.scss';
import { GetTodoListUsecase } from '../../domain/usecases/getTodoList_usecase';
import { NoParams, useUsecase } from '@cinch-build/core';
import { Todo } from '../../domain/entities/todo';
import {
  CreateTodoParams,
  CreateTodoUsecase,
} from '../../domain/usecases/createTodo_usecase';

export const TodoList = () => {
  const [list, error] = useUsecase<Todo[]>(
    new GetTodoListUsecase(),
    new NoParams(),
    []
  );

  const [item, errort] = useUsecase<Todo>(
    new CreateTodoUsecase(),
    new CreateTodoParams('example'),
    undefined
  );

  return (
    <div>
      <h1>Welcome to TodoList!</h1>
      {error ? <span>Error detected</span> : ''}
      {list.map((e: Todo) => (
        <div key={e.id}>
          <span>{e.id}</span> - <span>{e.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
