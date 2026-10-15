# EduLedger

**EduLedger** is an open-source school management project designed to make school administration easier through a simple, organized digital platform.

## About the Project

EduLedger is being developed to help organize school information and simplify administrative tasks. The project currently includes a dashboard, school registration, and a school directory.

The long-term goal is to build a useful, reliable platform that developers can collaborate on and improve together.

## Current Features

- School registration
- School directory
- Dashboard interface
- React-based frontend
- Express.js backend
- SQLite database

## Project Status

🚧 **Under active development.**

EduLedger is an evolving project, and contributions, feedback, and suggestions are welcome.

## Getting Started

Follow these steps to run EduLedger on your local machine.

### Prerequisites

Before you begin, install:

- [Node.js](https://nodejs.org/) (a supported version compatible with Vite 8)
- npm (included with Node.js)
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/olaayoade91-byte/EduLedger.git
cd EduLedger
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Start the backend**

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

**4. Open a second terminal and install frontend dependencies**

From the project root, run:

```bash
cd frontend
npm install
```

**5. Start the frontend**

```bash
npm run dev
```

Vite will display the local address where you can open the application in your browser.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check whether the API is running |
| GET | `/api/schools` | Retrieve registered schools |
| POST | `/api/schools` | Register a school |

The school registration endpoint requires a school name and email address.