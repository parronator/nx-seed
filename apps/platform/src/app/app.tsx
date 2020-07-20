import React from 'react';

import './app.scss';

import TodoList from './todoExample/presentation/pages/list';

export const App = () => {
  return (
    <div className="app">
      <TodoList />
    </div>
  );
};

export default App;
