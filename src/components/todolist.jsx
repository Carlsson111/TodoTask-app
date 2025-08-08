import React from 'react';
import TodoItem from 'src\components\TodoItem.jsx';
function TodoList({ todos, toggleDone }) {
  if (todos.length === 0) {
    return <p className="text-muted">No tasks yet.</p>;
  }

  return (
    <div id="todo-list-container">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} toggleDone={toggleDone} />
      ))}
    </div>
  );
}

export default TodoList;