import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmationDialog from './components/ConfirmationDialog';
import Pagination from './components/Pagination'; // Import the Pagination component
import './App.css';
import logo from './assets/logo.png';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-10-12', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This task is good' },
    { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This task is good' },
    { id: 4, assignedTo: 'User 4', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This task is good' },
    { id: 5, assignedTo: 'User 5', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This task is good' },
    { id: 6, assignedTo: 'User 6', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This task is good' },
  ]);

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(6); // Initial number of tasks per page

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setShowForm(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setTaskToEdit(null);
    setShowForm(false);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== taskIdToDelete));
    setTaskIdToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleDeleteRequest = (id) => {
    setTaskIdToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const filteredTasks = tasks.filter((task) =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    window.location.reload(); // Reloads the entire page
  };

  // Update the pagination logic to use tasksPerPage
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  // Handle the change in items per page
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setTasksPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  // Function to count unique assignees
  const countUniqueAssignees = () => {
    const assignedToSet = new Set(tasks.map(task => task.assignedTo));
    return assignedToSet.size;
  };

  return (
    <div className="App">
      <div className="task-header">
        <div className="header-logo">
          <img src={logo} alt="Logo" className="logo" />
          <div className="task-title">
            <h1>Tasks</h1>
            <p className="all-tasks-text">All Tasks</p>
            <p className="unique-assignees-text">{countUniqueAssignees()} records</p> {/* Display unique assignees */}
          </div>
        </div>
        <div className="task-actions">
          <div className="task-1">
            <button className="new-task-btn" onClick={() => setShowForm(true)}>
              New Task
            </button>
            <button className="new-task-btn" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
          <div className="task2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="task-search"
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TaskForm
              addTask={addTask}
              taskToEdit={taskToEdit}
              updateTask={updateTask}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {showConfirmDialog && (
        <ConfirmationDialog
          message="Do you want to delete this task?"
          onConfirm={deleteTask}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}

      <TaskList tasks={currentTasks} onEdit={handleEdit} onDelete={handleDeleteRequest} />

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Directly set the current page
        onItemsPerPageChange={handleItemsPerPageChange} // Pass the function to handle items per page
      />
    </div>
  );
}

export default App;
