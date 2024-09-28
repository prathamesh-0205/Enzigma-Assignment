// src/services/taskService.js

export const getTasks = async () => {
    const response = await fetch('https://api.example.com/tasks');
    return response.json();
  };
  
  export const addTask = async (task) => {
    const response = await fetch('https://api.example.com/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  
  export const updateTask = async (task) => {
    const response = await fetch(`https://api.example.com/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  
  export const deleteTask = async (taskId) => {
    await fetch(`https://api.example.com/tasks/${taskId}`, { method: 'DELETE' });
  };
  