const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // You can change this to any port you prefer

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON bodies

// Sample task data
let tasks = [
    { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-10-12', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This task is good' },
];

// Routes
// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.map(task => (task.id == id ? { ...task, ...req.body } : task));
    res.json({ message: 'Task updated' });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    res.json({ message: 'Task deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
