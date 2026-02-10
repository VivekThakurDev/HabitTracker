import React, { useState } from 'react';

const HabitList = ({ habits, logs, onLog, onUpdate, onDelete }) => {
    const today = new Date().toISOString().split('T')[0];
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const isCompletedToday = (habitId) => {
        return logs.some(log => log.habit_id === habitId && log.date === today && log.status === 'completed');
    };

    const startEdit = (habit) => {
        setEditingId(habit.id);
        setEditForm(habit);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = () => {
        onUpdate(editingId, editForm);
        setEditingId(null);
    };

    return (
        <div className="mt-4 flex flex-col gap-3">
            {habits.length === 0 ? (
                <div className="text-center text-gray mt-8 p-8" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌱</div>
                    <p>No habits yet. Add one to get started!</p>
                </div>
            ) : (
                habits.map(habit => {
                    if (editingId === habit.id) {
                        return (
                            <div key={habit.id} className="card animate-fade-in" style={{ padding: '1.25rem', border: '1px solid var(--primary-color)', background: 'rgba(124, 58, 237, 0.05)' }}>
                                <input
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="text-lg font-bold mb-3 w-full bg-transparent border-b border-gray-700 focus:border-primary outline-none py-1"
                                    placeholder="Habit Name"
                                    autoFocus
                                />
                                <div className="flex gap-3 mb-4">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray mb-1 block">Category</label>
                                        <select
                                            value={editForm.category}
                                            onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                            className="text-sm w-full p-2 rounded bg-slate-800 border border-slate-700"
                                        >
                                            <option>General</option>
                                            <option>Health</option>
                                            <option>Productivity</option>
                                            <option>Mindfulness</option>
                                            <option>Learning</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-gray mb-1 block">Frequency</label>
                                        <select
                                            value={editForm.frequency}
                                            onChange={e => setEditForm({ ...editForm, frequency: e.target.value })}
                                            className="text-sm w-full p-2 rounded bg-slate-800 border border-slate-700"
                                        >
                                            <option>Daily</option>
                                            <option>Weekly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={cancelEdit} className="px-3 py-1 text-sm text-gray hover:text-white transition-colors">Cancel</button>
                                    <button onClick={saveEdit} className="primary px-4 py-1 text-sm rounded shadow-lg shadow-purple-900/20">Save Changes</button>
                                </div>
                            </div>
                        );
                    }

                    const completed = isCompletedToday(habit.id);
                    const todayLog = logs.find(log => log.habit_id === habit.id && log.date === today);
                    const duration = todayLog ? todayLog.duration || 0 : 0;

                    return (
                        <div
                            key={habit.id}
                            className={`card group flex justify-between items-center transition-all duration-300 hover:transform hover:scale-[1.01] ${completed ? 'opacity-60 bg-slate-900/50' : 'hover:shadow-lg hover:shadow-purple-900/10'}`}
                            style={{ padding: '1.25rem', borderLeft: `4px solid ${completed ? '#10b981' : 'var(--primary-color)'}` }}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <div className={`font-bold text-lg ${completed ? 'line-through text-gray' : 'text-white'}`}>
                                        {habit.name}
                                    </div>

                                    {/* Action Buttons (Visible on Hover) */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <button
                                            onClick={() => startEdit(habit)}
                                            className="p-1.5 rounded-full hover:bg-white/10 text-gray hover:text-primary transition-colors"
                                            title="Edit"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        </button>
                                        <button
                                            onClick={() => onDelete(habit.id)}
                                            className="p-1.5 rounded-full hover:bg-white/10 text-gray hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                        {habit.category}
                                    </span>
                                    <span className="text-xs text-gray flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        {habit.frequency}
                                    </span>
                                    {completed && duration > 0 && (
                                        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            {duration} hrs
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
                                {!completed ? (
                                    <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-white/5">
                                        <input
                                            type="number"
                                            placeholder="Hrs"
                                            step="0.1"
                                            className="text-sm bg-transparent text-white text-center outline-none"
                                            style={{ width: '40px' }}
                                            id={`duration-${habit.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const input = document.getElementById(`duration-${habit.id}`);
                                                const hrs = input.value ? parseFloat(input.value) : 0;
                                                onLog(habit.id, 'completed', hrs);
                                            }}
                                            className="primary text-xs px-3 py-1.5 rounded hover:scale-105 active:scale-95 transition-transform"
                                        >
                                            Done
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => onLog(habit.id, 'pending', 0)}
                                        className="flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                                        style={{
                                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                            color: '#10b981',
                                            border: '1px solid #10b981',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                        }}
                                        title="Mark as pending"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default HabitList;
