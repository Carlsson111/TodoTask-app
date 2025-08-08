import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  const [todos, setTodos] = useState([]);
  const [showDone, setShowDone] = useState(true);

  const addTodo = (task) => setTodos([...todos, { ...task, done: false }]);
  const toggleDone = (index) =>
    setTodos(
      todos.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  const clearDone = () => setTodos(todos.filter((t) => !t.done));

  const filteredTodos = showDone ? todos : todos.filter((t) => !t.done);

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2 p-0 bg-white border-end min-vh-100">
          <Sidebar />
        </div>
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <h1 className="mb-4">Tasks</h1>
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <TodoForm addTodo={addTodo} />
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
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
        </div>
      </div>
    </div>
  );
}

export default App;