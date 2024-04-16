import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './actions';
import { PiTrashSimpleLight } from "react-icons/pi";
import { IoCheckmark } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import Plus from './assets/Plus.svg'


const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }));
      setNewTodo('');
    }
  };

  const handleToggleStatus = (id) => {
    const todo = todos.find(todo => todo.id === id);
    dispatch(editTodo(id, {
      ...todo,
      completed: !todo.completed
    }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="container mx-auto max-w-lg p-16 rounded-lg">
      <div className="flex mb-4 mt-16">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-[#3E1671] px-4 py-2 rounded-md mr-2 w-full h-[40px] bg-transparent outline-none focus:text-[#cac7c7] "
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo} className="bg-[#9E78CF] text-white px-2 py-2 rounded-lg text-3xl hover:bg-purple-500 transition duration-700"><img src={Plus} alt="" /></button>
      </div>
      <p className="mb-2 text-gray-300 mt-10">Tasks to do - {activeTodos.length}</p>
      <ul className='pb-3 rounded-md'>
        {activeTodos.map(todo => (
          <li key={todo.id} className={`py-2 flex items-center text-[#9E78CF] pt-4 pb-4 rounded-md`}>
            {todo.text}
            <div className="ml-auto">
              <button onClick={() => handleToggleStatus(todo.id)} className="mr-2 text-[#9E78CF] text-2xl hover:text-[#291246] transition duration-500"><IoCheckmark /></button>
              <button onClick={() => handleDelete(todo.id)} className="text-[#9E78CF] text-2xl hover:text-[#291246] transition duration-500"><PiTrashSimpleLight /></button>
            </div>
          </li>
        ))}
      </ul>
     
      <p className="mb-2 text-gray-300 mt-14">Done - {completedTodos.length}</p>
      <ul className='pb-3 rounded-md'>
        {completedTodos.map(todo => (
          <li key={todo.id} className={`py-2 flex items-center text-[#78CFB0] line-through pt-4 pb-4 rounded-md`}>
            {todo.text}
            <div className="ml-auto">
              <button onClick={() => handleToggleStatus(todo.id)} className="mr-2 text-[#9E78CF] text-2xl hover:text-[#291246] transition duration-500"><AiOutlineRollback /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
