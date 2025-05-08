import React, { useState, useEffect } from 'react';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchTodos = async () => {
    // we will get userData from localStorage and set to backend
    let userData = JSON.parse(localStorage.getItem("userData"));

    // const res = await fetch('http://localhost:5000/api/todos');

    console.log("savedData", userData)
    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`,  
      }
    });
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      setNewTodo('');
      fetchTodos();
    }
  };

  const saveEdit = async (id) => {
    if (editText.trim()) {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editText }),
      });
      setEditingTodo(null);
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Todo Dashboard</h2>
        <div className="flex gap-2 mb-4">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add todo"
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md shadow-sm"
            >
              {editingTodo === todo._id ? (
                <div className="flex items-center gap-2 flex-grow">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => saveEdit(todo._id)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between flex-grow">
                  <span className="text-gray-800">{todo.title}</span>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditingTodo(todo._id);
                        setEditText(todo.title);
                      }}
                      className="px-2 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
