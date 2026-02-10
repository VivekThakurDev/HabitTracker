import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const Dashboard = ({ habits, logs }) => {
    // Calculate completion rate per habit
    const habitStats = habits.map(habit => {
        const habitLogs = logs.filter(log => log.habit_id === habit.id && log.status === 'completed');
        return {
            name: habit.name,
            completed: habitLogs.length,
        };
    });

    // Calculate daily completion trend (last 7 days)
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const last7Days = getLast7Days();
    const dailyStats = last7Days.map(date => {
        const dayLogs = logs.filter(log => log.date === date && log.status === 'completed');
        const dayDuration = dayLogs.reduce((acc, log) => acc + (log.duration || 0), 0);
        return {
            date: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }), // e.g., "Mon"
            count: dayLogs.length,
            duration: dayDuration
        };
    });

    return (
        <div className="card animate-fade-in">
            <h2>Dashboard</h2>
            <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>

                {/* Habit Completion Chart */}
                <div style={{ flex: '1 1 300px', height: '250px' }}>
                    <h3 className="text-sm text-gray">Total Completions per Habit</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={habitStats}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                                {habitStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Daily Trend Chart - Count */}
                <div style={{ flex: '1 1 300px', height: '250px' }}>
                    <h3 className="text-sm text-gray">Daily Activity (Count)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyStats}>
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Daily Trend Chart - Time */}
                <div style={{ flex: '1 1 300px', height: '250px' }}>
                    <h3 className="text-sm text-gray">Daily Time Spent (Hrs)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyStats}>
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="duration" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Completion Trend - Line Graph */}
                <div style={{ flex: '1 1 300px', height: '250px' }}>
                    <h3 className="text-sm text-gray">Completion Trend</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
