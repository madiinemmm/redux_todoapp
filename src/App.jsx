// App.jsx

import React from 'react';
import TodoList from './TodoList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1 className='text-center mt-5'>Todo App</h1>
      <TodoList />
    </div>
  );
};

export default App; // default eksportini qo'shing