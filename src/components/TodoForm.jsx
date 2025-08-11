import React, { useState, useEffect } from "react";

// TodoForm component to handle adding and editing todos

const TodoForm = ({ onSubmit, editingTodo, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setDueDate(editingTodo.dueDate);
      setAssignee(editingTodo.assignee);
      setSelectedFiles([...editingTodo.attachments]);
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const handleFileConfirm = (e) => {
    const fileInput = e.target.parentElement.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if (!file) return;

    const exists = selectedFiles.some(f => f.name === file.name && f.size === file.size);
    if (exists) {
      alert("This file is already added.");
      fileInput.value = "";
      return;
    }

    setSelectedFiles([...selectedFiles, file]);
    fileInput.value = "";
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignee('');
    setSelectedFiles([]);
    setTitleError(false);
    setDueDateError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const titleTrimmed = title.trim();
    const descriptionTrimmed = description.trim();

    // Validation
    let hasErrors = false;
    if (!titleTrimmed) {
      setTitleError(true);
      hasErrors = true;
    } else {
      setTitleError(false);
    }

    if (!dueDate) {
      setDueDateError(true);
      hasErrors = true;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDueDate = new Date(dueDate);
      if (selectedDueDate < today) {
        setDueDateError(true);
        alert("Due date cannot be in the past.");
        hasErrors = true;
      } else {
        setDueDateError(false);
      }
    }

    if (hasErrors) return;

    const todoData = {
      title: titleTrimmed,
      description: descriptionTrimmed,
      dueDate,
      assignee,
      attachments: selectedFiles,
    };

    onSubmit(todoData);
    
    if (!editingTodo) {
      resetForm();
    }
  };

  return (
    <div className="p-4 bg-white rounded-3 shadow-sm border">
      <div onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${titleError ? 'is-invalid' : ''}`}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="due-date" className="form-label">Due Date</label>
            <input
              type="date"
              className={`form-control ${dueDateError ? 'is-invalid' : ''}`}
              id="due-date"
              min={todayStr}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="assignee" className="form-label">
              Assign To <span className="text-muted">(optional)</span>
            </label>
            <select
              className="form-select"
              id="assignee"
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

        {/* Attachments */}
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">Attachments</label>
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
          {selectedFiles.length > 0 && (
            <ul className="list-group mt-3">
              {selectedFiles.map((file, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFile(index)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-end">
          {editingTodo && (
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {editingTodo ? 'Update Task' : '+ Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default TodoForm;