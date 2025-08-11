import React from "react";

// TodoList component to display the list of todos
// It includes functionality to edit, delete, toggle done status, and filter todos
const TodoList = ({ todos, onEdit, onDelete, onToggleDone, showOnlyDone, onToggleFilter, onClearDone }) => {
  return (
    <div className="p-4 mt-4 bg-white rounded-3 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Todos</h4>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={onToggleFilter}
          >
            {showOnlyDone ? "Show All" : "Show Done"}
          </button>
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={onClearDone}
          >
            Clear Done Tasks
          </button>
        </div>
      </div>
      
      <div>
        {todos.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted">No todos found</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className={`mb-1 ${todo.done ? 'text-decoration-line-through text-muted' : ''}`}>
                    {todo.title}
                  </h5>
                  <p className="mb-2">{todo.description || ""}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <div>
                      <i className="bi bi-calendar-event"></i>
                      <small className="text-muted"> Due: {todo.dueDate}</small>
                    </div>
                    {todo.assignee && (
                      <span className="badge bg-info text-white">
                        <i className="bi bi-person"></i> {todo.assignee}
                      </span>
                    )}
                    {todo.attachments?.length > 0 && (
                      <div className="dropdown d-inline">
                        <span 
                          className="badge bg-secondary dropdown-toggle" 
                          data-bs-toggle="dropdown" 
                          role="button"
                        >
                          <i className="bi bi-paperclip"></i> {todo.attachments.length} attachment(s)
                        </span>
                        <ul className="dropdown-menu">
                          {todo.attachments.map((file, index) => (
                            <li key={index}>
                              <a 
                                className="dropdown-item" 
                                href={URL.createObjectURL(file)} 
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-end">
                  <small className="text-muted">Created: {todo.createdDate}</small><br />
                  <button 
                    className="btn btn-sm btn-outline-success me-1" 
                    onClick={() => onToggleDone(todo.id)}
                    title="Mark done"
                  >
                    <i className={`bi ${todo.done ? 'bi-check-circle-fill' : 'bi-check-circle'}`}></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary me-1" 
                    onClick={() => onEdit(todo)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={() => onDelete(todo.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default TodoList;