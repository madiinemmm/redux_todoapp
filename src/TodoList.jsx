import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './actions';
import { IoCheckmarkOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

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

  const handleEdit = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleSaveEdit = () => {
    dispatch(editTodo(editTodoId, { text: editTodoText }));
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
  
    <div className="container mx-auto max-w-lg p-16 rounded-lg">
       
 
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-purple-700 px-4 py-2 rounded-md mr-2 w-full h-9 bg-transparent outline-none focus:text-purple-600 "
          placeholder="Add a new task"
        
        />
        <button onClick={handleAddTodo} className="bg-purple-700 text-white px-2  rounded-md text-3xl hover:bg-purple-500 transition duration-700 ">+</button>
      </div>
      <p className="mb-2 text-gray-300 mt-10">Tasks to do - {todos.length}</p>
      <ul className=' pb-3 rounded-md'>
       
        {todos.map(todo => (
          <li key={todo.id} className=" py-2 flex items-center text-purple-600 pt-4 pb-4 rounded-md ">
            {editTodoId === todo.id ? (
              <div className="flex items-center w-full ">
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  className="border border-purple-600 px-3 py-1 rounded-md mr-2 w-full bg-transparent outline-none"
                />
                <button onClick={handleSaveEdit} className="text-purple-600 mr-2 ">Save</button>
              </div>
            ) : (
              <>
                <span className="mr-2">{todo.text}</span>
                <div className="ml-auto">
                  <button onClick={() => handleEdit(todo.id, todo.text)} className="text-purple-600 mr-2 text-2xl"><IoCheckmarkOutline />
               </button>
                  <button onClick={() => handleDelete(todo.id)} className="text-purple-600 text-2xl"><AiOutlineDelete />
</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
