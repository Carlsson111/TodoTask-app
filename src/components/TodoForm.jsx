import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileConfirm = () => {
    const fileInput = document.getElementById('attachment');
    if (fileInput.files.length > 0) {
      setFiles([...files, fileInput.files[0].name]);
      fileInput.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    addTodo({ title, description, dueDate, assignee, files });
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignee('');
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Assign To <span className="text-muted">(optional)</span>
          </label>
          <select
            className="form-select"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">-- Select a person --</option>
            <option value="Linus">Linus</option>
            <option value="Bob">Bob</option>
            <option value="Carl">Carl</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Attachments</label>
        <div className="input-group">
          <input className="form-control" type="file" id="attachment" />
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleFileConfirm}
          >
            Confirm to Add
          </button>
        </div>
        <ul className="list-group mt-3">
          {files.map((f, i) => (
            <li className="list-group-item" key={i}>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          + Add Task
        </button>
      </div>
    </form>
  );
}

export default TodoForm;