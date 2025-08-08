import React from 'react';

function TodoItem({ todo, index, toggleDone }) {
  return (
    <div
      className={`p-3 mb-2 border rounded d-flex justify-content-between align-items-center ${
        todo.done ? 'bg-light text-decoration-line-through' : ''
      }`}
    >
      <div>
        <h5>{todo.title}</h5>
        {todo.description && <p className="mb-1">{todo.description}</p>}
        <small className="text-muted">
          Due: {todo.dueDate} {todo.assignee && `| Assigned to: ${todo.assignee}`}
        </small>
        {todo.files?.length > 0 && (
          <ul className="mt-2 mb-0 small">
            {todo.files.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="btn btn-sm btn-outline-success"
        onClick={() => toggleDone(index)}
      >
        {todo.done ? 'Undo' : 'Done'}
      </button>
    </div>
  );
}

export default TodoItem;