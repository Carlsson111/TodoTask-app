import React from 'react';

function TodoForm() {
  return (
    <div className="p-4 bg-white rounded-3 shadow-sm border">
      <form id="todo-form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" required placeholder="Enter task title" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3"></textarea>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="due-date" className="form-label">Due Date</label>
            <input type="date" className="form-control" id="due-date" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="assignee" className="form-label">
              Assign To <span className="text-muted">(optional)</span>
            </label>
            <select className="form-select" id="assignee">
              <option value="">-- Select a person --</option>
              <option value="Linus">Linus</option>
              <option value="Bob">Bob</option>
              <option value="Carl">Carl</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">Attachments</label>
          <div className="input-group">
            <input className="form-control" type="file" id="attachment" />
            <button className="btn btn-outline-primary" type="button" id="confirm-file">Confirm to Add</button>
          </div>
          <ul className="list-group mt-3" id="confirmed-files"></ul>
        </div>

        <div className="text-end">
          <button id="submit-btn" type="submit" className="btn btn-primary">+ Add Task</button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;