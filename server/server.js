const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initExcelFile, getHabits, addHabit, updateHabit, deleteHabit, getLogs, logHabit } = require('./excelHandler');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize data file on start
initExcelFile();

// API Routes

// Get all data (habits and logs)
app.get('/api/data', (req, res) => {
    try {
        const habits = getHabits();
        const logs = getLogs();
        res.json({ habits, logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new habit
app.post('/api/habit', (req, res) => {
    try {
        const { name, category, frequency } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        const newHabit = addHabit({ name, category, frequency });
        res.json(newHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a habit
app.put('/api/habit/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updatedHabit = updateHabit(id, req.body);
        if (!updatedHabit) return res.status(404).json({ error: 'Habit not found' });
        res.json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a habit
app.delete('/api/habit/:id', (req, res) => {
    try {
        const { id } = req.params;
        const success = deleteHabit(id);
        if (!success) return res.status(404).json({ error: 'Habit not found' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Log a habit status
app.post('/api/log', (req, res) => {
    try {
        const { date, habit_id, status, duration } = req.body;
        if (!date || !habit_id) return res.status(400).json({ error: 'Date and Habit ID are required' });

        const logEntry = logHabit(date, habit_id, status, duration);
        res.json(logEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static files from the React client
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve the React app for any unknown routes
app.get(/.*/, (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
