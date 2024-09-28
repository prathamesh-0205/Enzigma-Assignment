import React, { useState, useEffect } from 'react';
import './TaskForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskForm = ({ addTask, taskToEdit, updateTask, onClose }) => {
  const [task, setTask] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: '',
  });

  // Load taskToEdit if available
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

  return (
    <div>
      <div className="modal-header">
        <h2>{taskToEdit ? 'Edit Task' : 'New Task'}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <div className="modal-body"> */}
            <div className="modal-1">
                <div className="inputfields">
                    <label>Assigned To</label>
                    <input
                    type="text"
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    required
                    />
                    </div>
                <div className="inputfields">
                    <label>Status</label>
                    <select name="status" value={task.status} onChange={handleChange} required>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>
                </div>  
            </div>
            <div className="modal-1">
                <div className="inputfields">
                    <label>Due Date</label>
                    <input
                    type="name"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                    />
                    </div>
                <div className="inputfields">
                    <label>Priority</label>
                    <select name="status" value={task.priority} onChange={handleChange} required>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Normal">Completed</option>
                    </select>
                </div>  
            </div>
            

            {/* <div className="modal-2">
                <div className="inputfields">
                    <label>Due Date</label>
                    <input type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="inputfields">
                    <label>Priority</label>
                    <select name="priority" value={task.priority} onChange={handleChange} required>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    </select>
                </div>
            </div>
            */}

            <div className="inputfields">
                <div className="inputlable">
                    <label>Description</label>
                </div>
                    <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    ></textarea>
             </div>
        {/* </div> */}

        <div className="modal-footer">
        <button class="save-btn" type="submit">{taskToEdit ? 'Update Task' : 'Save'}</button>
          <button class="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
