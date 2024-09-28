import React, { useState } from 'react';
import TaskRow from './TaskRow';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [selectedTasks, setSelectedTasks] = useState({});

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prevSelected) => ({
      ...prevSelected,
      [taskId]: !prevSelected[taskId],
    }));
  };

  return (
    <div className="task-list">
      <table>
        <thead>
          <tr>
            <th></th> {/* Add a header for the checkbox column */}
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              isSelected={!!selectedTasks[task.id]} // Check if the task is selected
              onSelect={() => handleCheckboxChange(task.id)} // Handle checkbox state change
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
