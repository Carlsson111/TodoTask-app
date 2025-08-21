import React from 'react';

function TodoList() {
  return (
    <div className="p-4 mt-4 bg-white rounded-3 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Todos</h4>
        <div className="d-flex gap-2">
          <button id="toggle-done-btn" className="btn btn-outline-secondary btn-sm">Show Done</button>
          <button id="clear-done-btn" className="btn btn-outline-danger btn-sm">Clear Done Tasks</button>
        </div>
      </div>
      <div id="todo-list-container"></div>
    </div>
  );
}

export default TodoList;