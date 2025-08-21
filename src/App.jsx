import React, { useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterDone, setFilterDone] = useState(false);
  const headerRef = useRef(null);

  const addTodo = (todo) => {
    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = todo;
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos(prev => [...prev, todo]);
    }

    // Scroll to header/form
    headerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    headerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const showDone = () => setFilterDone(true);
  const showAll = () => setFilterDone(false);
  const clearDone = () => {
  if (todos.some(t => t.done)) { // only ask if there's actually done tasks
    const confirmed = window.confirm("Are you sure you want to clear all done tasks?");
    if (confirmed) {
      setTodos(todos.filter(t => !t.done));
    }
  } else {
    alert("No done tasks to clear!");
  }
};

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 p-0">
          <Sidebar />
        </div>

        <div className="col-10 p-4">
          <div ref={headerRef}>
            <Header />
          </div>

          <TodoForm
            onSubmit={addTodo}
            initialValues={editingIndex !== null ? todos[editingIndex] : null}
            cancelEdit={cancelEdit}
          />

          <TodoList
            todos={todos}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            startEdit={startEdit}
            showDone={showDone}
            showAll={showAll}
            clearDone={clearDone}
            filterDone={filterDone}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

