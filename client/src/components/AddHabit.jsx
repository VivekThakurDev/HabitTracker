import React, { useState } from 'react';

const AddHabit = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('General');
    const [frequency, setFrequency] = useState('Daily');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onAdd({ name, category, frequency });
        setName('');
        setCategory('General');
        setFrequency('Daily');
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <button
                className="primary w-full mt-4"
                onClick={() => setIsOpen(true)}
            >
                + Add New Habit
            </button>
        );
    }

    return (
        <div className="card animate-fade-in mt-4">
            <div className="flex justify-between items-center mb-4">
                <h3>New Habit</h3>
                <button className="text-sm text-gray" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-sm text-gray block mb-1">Habit Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Read 30 mins"
                        autoFocus
                    />
                </div>

                <div className="flex gap-4">
                    <div className="w-full">
                        <label className="text-sm text-gray block mb-1">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>General</option>
                            <option>Health</option>
                            <option>Productivity</option>
                            <option>Mindfulness</option>
                            <option>Learning</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="text-sm text-gray block mb-1">Frequency</label>
                        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                            <option>Daily</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="primary">Save Habit</button>
            </form>
        </div>
    );
};

export default AddHabit;
