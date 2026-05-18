# Calorie Tracker

Full-stack calorie tracking app. Express REST API + React frontend with full CRUD for foods and meals.

## Requirements

- Node.js 18+ and npm
- Two free terminal windows (one for backend, one for frontend)

## Project Structure

```
calorie-tracker/
├── src/              # Backend (Express API)
│   ├── server.js
│   ├── routes/
│   ├── dao/
│   └── data/         # JSON storage (foods.json, meals.json)
├── frontend/         # React app (Create React App)
├── package.json      # Backend deps
└── README.md
```

## Setup

Clone, then install dependencies for **both** backend and frontend:

```bash
git clone <repo-url>
cd calorie-tracker

# Backend deps
npm install

# Frontend deps
cd frontend
npm install
cd ..
```

## Running the App

The backend uses port **3000** and the frontend uses port **3001**. They must run at the same time.

### Terminal 1 — Backend

```bash
# From the project root
npm start
```

You should see:

```
Server running on port 3000
```

Verify it works: open http://localhost:3000 → should return `{"message":"Calorie Tracker API works!"}`.

### Terminal 2 — Frontend

```bash
# From the project root
cd frontend
PORT=3001 npm start
```

Wait for `webpack compiled successfully`, then open:

**http://localhost:3001**

On Windows (CMD), set the port differently:

```bat
cd frontend
set PORT=3001 && npm start
```

On Windows (PowerShell):

```powershell
cd frontend
$env:PORT=3001; npm start
```

## API Endpoints

Base URL: `http://localhost:3000`

### Foods

| Method | Path           | Body                                              |
| ------ | -------------- | ------------------------------------------------- |
| GET    | `/foods`       | —                                                 |
| GET    | `/foods/:id`   | —                                                 |
| POST   | `/foods`       | `{ name, calories_per_unit, unit }`               |
| PUT    | `/foods/:id`   | `{ name?, calories_per_unit?, unit? }`            |
| DELETE | `/foods/:id`   | —                                                 |

### Meals

| Method | Path           | Body                                              |
| ------ | -------------- | ------------------------------------------------- |
| GET    | `/meals`       | —                                                 |
| GET    | `/meals/:id`   | —                                                 |
| POST   | `/meals`       | `{ foodId, quantity, date }`                      |
| PUT    | `/meals/:id`   | `{ foodId, quantity, date }`                      |
| DELETE | `/meals/:id`   | —                                                 |

A meal references a food by `foodId`. The backend looks up the food, multiplies `calories_per_unit × quantity`, and stores the result.

`/api/foods` and `/api/meals` are also mounted (same handlers).

## Frontend Pages

| Route     | Purpose                                                  |
| --------- | -------------------------------------------------------- |
| `/`       | Home + backend status badges                             |
| `/meals`  | Add / edit / delete meals (food dropdown + quantity)     |
| `/foods`  | Add / edit / delete foods                                |
| `/goal`   | BMI + daily calorie target (saved to `localStorage`)     |

## Data Persistence

Foods and meals are stored as JSON files in `src/data/`. Edits made through the UI persist to disk. Delete those files to reset the app.

## Stopping the App

In each terminal, press `Ctrl + C`.

## Troubleshooting

- **`Port 3000 already in use`** → another process is on 3000. Find and kill it: `lsof -i :3000` then `kill <PID>`.
- **Frontend shows "checking..." forever** → the backend is not running. Start it in Terminal 1.
- **CORS error in browser console** → restart the backend (CORS is enabled in `src/server.js`).
- **Meals page says "No foods available"** → add at least one food on the Foods page first.
