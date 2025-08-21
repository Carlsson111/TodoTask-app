import React from "react";

function TodoList({ todos, toggleDone, deleteTodo, startEdit, showDone, showAll, clearDone, filterDone }) {
  const displayedTodos = filterDone ? todos.filter(t => t.done) : todos;

  return (
    <div className="p-4 mt-4 bg-white rounded-3 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Todos</h4>
        <div className="d-flex gap-2">
          {filterDone ? (
            <button className="btn btn-outline-secondary btn-sm" onClick={showAll}>Show All</button>
          ) : (
            <button className="btn btn-outline-secondary btn-sm" onClick={showDone}>Show Done</button>
          )}
          <button className="btn btn-outline-danger btn-sm" onClick={clearDone}>Clear Done Tasks</button>
        </div>
      </div>

      {displayedTodos.length === 0 && (
        <p className="text-muted">
          {filterDone ? "No done tasks" : "No tasks"}
          </p>
        )}

      {displayedTodos.map((todo, index) => (
        <div key={index} className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
          <div>
            <h6 className={todo.done ? "text-decoration-line-through" : ""}>{todo.title}</h6>
            {todo.description && <p className="mb-1">{todo.description}</p>}
            <small className="text-muted">Due: {todo.dueDate}</small>
            {todo.attachments && todo.attachments.length > 0 && (
              <p className="mb-0 mt-1">
                Attachments: {todo.attachments.length === 1 ? todo.attachments[0].name : `${todo.attachments.length} attachments`}
              </p>
            )}
          </div>
          <div className="d-flex gap-1">
            <button
              className={`btn btn-sm ${todo.done ? "btn-success" : "btn-outline-success"}`}
              onClick={() => toggleDone(index)}
              title="Toggle Done"
            >
              <i className={`bi ${todo.done ? "bi-check-circle-fill" : "bi-check-circle"}`}></i>
            </button>
            <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(index)} title="Edit">
              <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(index)} title="Delete">
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;