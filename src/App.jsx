import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { openDB, loadTodosFromDB, saveTodoToDB, deleteTodoFromDB } from "./db";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showOnlyDone, setShowOnlyDone] = useState(false);

  // Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await loadTodosFromDB();
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    };
    loadTodos();
  }, []);

  const handleSubmitTodo = async (todoData) => {
    const createdDate = new Date().toISOString().split("T")[0];
    
    if (editingTodo) {
      // Update existing todo
      const updatedTodo = {
        ...editingTodo,
        ...todoData,
      };
      
      setTodos(todos.map(t => t.id === editingTodo.id ? updatedTodo : t));
      await saveTodoToDB(updatedTodo);
      setEditingTodo(null);
    } else {
      // Create new todo
      const newTodo = {
        id: Date.now(),
        ...todoData,
        createdDate,
        done: false,
      };
      
      setTodos([...todos, newTodo]);
      await saveTodoToDB(newTodo);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleDeleteTodo = async (id) => {
    setTodos(todos.filter(t => t.id !== id));
    await deleteTodoFromDB(id);
  };

  const handleToggleDone = async (id) => {
    const updatedTodos = todos.map(t => {
      if (t.id === id) {
        const updated = { ...t, done: !t.done };
        saveTodoToDB(updated);
        return updated;
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  const handleToggleFilter = () => {
    setShowOnlyDone(!showOnlyDone);
  };

  const handleClearDoneTasks = async () => {
    if (window.confirm("Are you sure you want to delete all done tasks?")) {
      const doneTasks = todos.filter(t => t.done);
      for (const task of doneTasks) {
        await deleteTodoFromDB(task.id);
      }
      setTodos(todos.filter(t => !t.done));
    }
  };

  const filteredTodos = showOnlyDone ? todos.filter(t => t.done) : todos;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 p-0">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="col-10 p-4">
          <Header />
          <TodoForm 
           onSubmit={handleSubmitTodo}
           editingTodo={editingTodo}
           onCancelEdit={handleCancelEdit}
      />
          <TodoList 
        todos={filteredTodos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
        onToggleDone={handleToggleDone}
        showOnlyDone={showOnlyDone}
        onToggleFilter={handleToggleFilter}
        onClearDone={handleClearDoneTasks}
      />
        </div>
      </div>
    </div>
  );
}

export default App;