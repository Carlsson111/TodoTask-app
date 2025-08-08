import React from 'react';
import TodoItem from './TodoItem.jsx';
function TodoList({ todos, toggleDone }) {
  if (todos.length === 0) {
    return <p className="text-muted">No tasks yet.</p>;
  }

  return (
    <ul className="list-group">
      {todos.map((todo, index) => (
        <li className="list-group-item" key={index}>
          <TodoItem todo={todo} index={index} toggleDone={toggleDone} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;