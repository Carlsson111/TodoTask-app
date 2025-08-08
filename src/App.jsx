import React, { useState } from 'react';
import TodoForm from 'src\components\TodoForm.jsx';
import TodoList from 'src\components\TodoList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [showDone, setShowDone] = useState(true);

  const addTodo = (task) => {
    setTodos([...todos, { ...task, done: false }]);
  };

  const toggleDone = (index) => {
    setTodos(
      todos.map((t, i) =>
        i === index ? { ...t, done: !t.done } : t
      )
    );
  };

  const clearDone = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  const filteredTodos = showDone ? todos : todos.filter((t) => !t.done);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Todo App</h1>

      <div className="p-4 bg-white rounded-3 shadow-sm border">
        <TodoForm addTodo={addTodo} />
      </div>

      <div className="p-4 mt-4 bg-white rounded-3 shadow-sm border">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Todos</h4>
          <div className="d-flex gap-2">
            <button
              onClick={() => setShowDone(!showDone)}
              className="btn btn-outline-secondary btn-sm"
            >
              {showDone ? 'Hide Done' : 'Show Done'}
            </button>
            <button
              onClick={clearDone}
              className="btn btn-outline-danger btn-sm"
            >
              Clear Done Tasks
            </button>
          </div>
        </div>
        <TodoList todos={filteredTodos} toggleDone={toggleDone} />
      </div>
    </div>
  );
}

export default App;