const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const FILE_PATH = path.join(__dirname, 'habits.xlsx');

// Initialize the Excel file if it doesn't exist
const initExcelFile = () => {
    if (!fs.existsSync(FILE_PATH)) {
        const wb = xlsx.utils.book_new();
        const habitsHeader = [['id', 'name', 'category', 'frequency']];
        const logsHeader = [['date', 'habit_id', 'status']];

        const wsHabits = xlsx.utils.aoa_to_sheet(habitsHeader);
        const wsLogs = xlsx.utils.aoa_to_sheet(logsHeader);

        xlsx.utils.book_append_sheet(wb, wsHabits, 'Habits');
        xlsx.utils.book_append_sheet(wb, wsLogs, 'Logs');

        xlsx.writeFile(wb, FILE_PATH);
        console.log('habits.xlsx created successfully.');
    }
};

const getWorkbook = () => {
    initExcelFile();
    return xlsx.readFile(FILE_PATH);
};

const readSheet = (sheetName) => {
    const wb = getWorkbook();
    const sheet = wb.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};

const writeSheet = (sheetName, data) => {
    const wb = getWorkbook();
    // Convert JSON to sheet
    const ws = xlsx.utils.json_to_sheet(data);

    // Replace the sheet in the workbook
    // Note: xlsx library doesn't easily support replacing sheets in-place without rebuilding workbook structure carefully or using specific update logic.
    // A simpler approach for this prototype is to read all sheets, update one, then write back.

    // However, to ensure structure is kept, let's just update the specific sheet object in the workbook
    wb.Sheets[sheetName] = ws;

    // We also need to update the SheetNames list if it was missing? (It won't be as we read it)
    // But json_to_sheet might not preserve column order perfectly if we aren't careful, but good enough for now.

    xlsx.writeFile(wb, FILE_PATH);
};

const addHabit = (habit) => {
    const habits = readSheet('Habits');
    const newHabit = {
        id: Date.now().toString(), // Simple ID generation
        ...habit
    };
    habits.push(newHabit);
    writeSheet('Habits', habits);
    return newHabit;
};

const getHabits = () => {
    return readSheet('Habits');
};

const getLogs = () => {
    return readSheet('Logs');
};

const logHabit = (date, habitId, status, duration = 0) => {
    const logs = readSheet('Logs');
    // Check if log exists for this date and habit
    const existingLogIndex = logs.findIndex(log => log.date === date && log.habit_id === habitId);

    if (existingLogIndex >= 0) {
        logs[existingLogIndex].status = status;
        if (duration !== undefined) logs[existingLogIndex].duration = duration;
    } else {
        logs.push({ date, habit_id: habitId, status, duration });
    }

    writeSheet('Logs', logs);
    return logs[existingLogIndex >= 0 ? existingLogIndex : logs.length - 1]; // Return the updated/new log
};

const updateHabit = (id, updatedFields) => {
    const habits = readSheet('Habits');
    const index = habits.findIndex(h => h.id.toString() === id.toString());
    if (index === -1) return null;

    habits[index] = { ...habits[index], ...updatedFields };
    writeSheet('Habits', habits);
    return habits[index];
};

const deleteHabit = (id) => {
    // Delete habit
    let habits = readSheet('Habits');
    habits = habits.filter(h => h.id.toString() !== id.toString());
    writeSheet('Habits', habits);

    // Delete related logs
    let logs = readSheet('Logs');
    logs = logs.filter(l => l.habit_id.toString() !== id.toString());
    writeSheet('Logs', logs);

    return true;
};

module.exports = {
    initExcelFile,
    getHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    getLogs,
    logHabit
};
