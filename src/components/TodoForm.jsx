import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function TodoForm({ onSubmit, initialValues, cancelEdit }) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [attachments, setAttachments] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (initialValues) {
      setValue("title", initialValues.title);
      setValue("description", initialValues.description);
      setValue("dueDate", initialValues.dueDate);
      setValue("assignee", initialValues.assignee || "");
      setAttachments(initialValues.attachments || []);
    } else {
      reset();
      setAttachments([]);
    }
  }, [initialValues, reset, setValue]);

  const handleAddAttachment = (e) => {
    const file = e.target.files[0];
    if (file && !attachments.some(f => f.name === file.name)) {
      setAttachments(prev => [...prev, file]);
    }
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const submitForm = (data) => {
    onSubmit({ ...data, attachments, done: initialValues?.done || false });
    reset();
    setAttachments([]);
  };

  const attachmentLabel = attachments.length === 1
    ? attachments[0].name
    : attachments.length > 1
      ? `${attachments.length} attachments`
      : "";

  return (
    <div className="p-4 bg-secondary-subtle rounded-3 shadow-sm border">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter task title"
          />
          {errors.title && <small className="text-danger">{errors.title.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            {...register("description")}
            rows={4}
          ></textarea>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              {...register("dueDate", {
                required: "Due date is required",
                validate: value => value >= today || "Due date cannot be in the past"
              })}
            />
            {errors.dueDate && <small className="text-danger">{errors.dueDate.message}</small>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Assign To <span className="text-muted">(optional)</span></label>
            <select className="form-select" {...register("assignee")}>
              <option value="">-- Select a person --</option>
              <option value="Linus">Linus</option>
              <option value="Bob">Bob</option>
              <option value="Carl">Carl</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Attachments</label>
          <div className="input-group mb-2">
            <input type="file" className="form-control" onChange={handleAddAttachment} />
          </div>
          {attachments.length > 0 && (
            <ul className="list-group">
              {attachments.map((f, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  {f.name}
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveAttachment(i)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-end">
          {initialValues && <button type="button" className="btn btn-secondary me-2" onClick={cancelEdit}>Cancel</button>}
          <button type="submit" className="btn btn-primary">{initialValues ? "Save Changes" : "+ Add Task"}</button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;