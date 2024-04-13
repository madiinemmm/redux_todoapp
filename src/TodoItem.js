import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo } from './actions';

const TodoItem = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editTodo(todo.id, { ...todo, text }));
  };

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default TodoItem;