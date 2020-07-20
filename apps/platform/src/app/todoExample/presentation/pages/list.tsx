import React from 'react';

import './list.scss';
import { GetTodoListUsecase } from '../../domain/usecases/getTodoList_usecase';
import { NoParams, useGet } from '@cinch-build/core';
import { Todo } from '../../domain/entities/todo';

export const TodoList = () => {
  const [list, error] = useGet<Todo[]>(
    new GetTodoListUsecase(),
    new NoParams(),
    []
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
