# Daily Habit Tracker

A modern, full-stack habit tracking application built with **React** and **Node.js**. It allows users to track their daily habits, log time spent, and visualize progress with interactive charts, all while storing data locally in an Excel file.

## 🚀 Features

-   **Habit Management**: Create, Read, Update, and Delete (CRUD) habits.
-   **Daily Logging**: Mark habits as complete and log duration in **Hours** (e.g., 1.5 hrs).
-   **Data Persistence**: Uses a local Excel file (`habits.xlsx`) as a lightweight database.
-   **Interactive Dashboard**:
    -   **Completion Rates**: Bar chart showing total completions per habit.
    -   **Daily Activity**: Bar chart showing number of habits completed per day.
    -   **Time Tracking**: Bar chart showing total hours spent per day.
    -   **Trends**: Line graph visualizing completion trends over the last 7 days.
-   **Polished UI**: Glassmorphism design with dark mode, SVG icons, and smooth animations.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Vanilla CSS (Custom Variables), Recharts (Visualization).
-   **Backend**: Node.js, Express.
-   **Database**: `xlsx` (Excel file handling).
-   **Tools**: Axios (API requests), Postman (Testing).

## 📂 Project Structure

```
/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Dashboard, HabitList, AddHabit
│   │   ├── App.jsx         # Main Logic
│   │   └── index.css       # Global Styles
│   └── package.json
│
├── server/                 # Backend (Express)
│   ├── server.js           # API Routes
│   ├── excelHandler.js     # Data Access Layer
│   └── habits.xlsx         # Database File
│
├── analysis.py             # Python script for data insights
└── requirements.txt        # Dependency list
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js installed on your machine.
-   (Optional) Python for running the analysis script.

### 1. Backend API
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
npm start
```
*Server runs on `http://localhost:3001`*

### 2. Frontend App
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
npm run dev
```
*Client runs on `http://localhost:5173` (or 5174)*

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/data` | Fetch all habits and logs. |
| `POST` | `/api/habit` | Create a new habit. |
| `PUT` | `/api/habit/:id` | Update habit details. |
| `DELETE` | `/api/habit/:id` | Delete a habit and its logs. |
| `POST` | `/api/log` | Log completion and duration for a date. |

## 📊 Data Analysis
You can generate a statistical report of your habits using the provided Python script:
```bash
python analysis.py
```

## 🎨 UI & Customization
-   **Themes**: Colors are defined in `client/src/index.css` using CSS variables (`--primary-color`, etc.).
-   **Icons**: Uses standard SVG icons for a lightweight footprint.

---
*Created by Antigravity*
