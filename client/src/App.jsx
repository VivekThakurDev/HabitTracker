import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import HabitList from './components/HabitList';
import AddHabit from './components/AddHabit';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/data`);
      setHabits(res.data.habits || []);
      setLogs(res.data.logs || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to connect to server. Ensure local server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddHabit = async (habitData) => {
    try {
      const res = await axios.post(`${API_URL}/habit`, habitData);
      setHabits([...habits, res.data]);
    } catch (err) {
      console.error("Error adding habit:", err);
      alert("Failed to add habit");
    }
  };

  const handleLogHabit = async (habitId, status, duration = 0) => {
    try {
      const date = new Date().toISOString().split('T')[0];
      const res = await axios.post(`${API_URL}/log`, {
        date,
        habit_id: habitId,
        status,
        duration
      });

      // Update local state optimistically or re-fetch
      // For simplicity, let's update logs array
      const existingLogIndex = logs.findIndex(l => l.date === date && l.habit_id === habitId);
      let newLogs = [...logs];
      if (existingLogIndex >= 0) {
        newLogs[existingLogIndex] = res.data;
      } else {
        newLogs.push(res.data);
      }
      setLogs(newLogs);

    } catch (err) {
      console.error("Error logging habit:", err);
    }
  };

  const handleUpdateHabit = async (id, updatedFields) => {
    try {
      const res = await axios.put(`${API_URL}/habit/${id}`, updatedFields);
      setHabits(habits.map(h => h.id === id ? res.data : h));
    } catch (err) {
      console.error("Error updating habit:", err);
      alert("Failed to update habit");
    }
  };

  const handleDeleteHabit = async (id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await axios.delete(`${API_URL}/habit/${id}`);
      setHabits(habits.filter(h => h.id !== id));
      setLogs(logs.filter(l => l.habit_id !== id));
    } catch (err) {
      console.error("Error deleting habit:", err);
      alert("Failed to delete habit");
    }
  };

  return (
    <div className="container">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1>Habit Tracker</h1>
          <p className="text-gray">Track your daily goals and build consistency.</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </header>

      {error ? (
        <div className="card" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
          {error}
          <button onClick={fetchData} className="ml-4 text-sm underline">Retry</button>
        </div>
      ) : loading ? (
        <div className="text-center text-gray">Loading...</div>
      ) : (
        <div className="flex flex-col gap-8">
          <Dashboard habits={habits} logs={logs} />

          <div>
            <div className="flex justify-between items-end mb-4">
              <h2>My Habits</h2>
            </div>
            <HabitList
              habits={habits}
              logs={logs}
              onLog={handleLogHabit}
              onUpdate={handleUpdateHabit}
              onDelete={handleDeleteHabit}
            />
            <AddHabit onAdd={handleAddHabit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
