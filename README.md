# Full-Stack Calculator

A simple full-stack calculator application developed as part of a coding assignment.

The application consists of a React frontend and a Go backend connected through a REST API.

## Features

* Addition
* Subtraction
* Multiplication
* Division
* Division-by-zero validation
* Input validation
* Backend error handling
* Responsive user interface
* REST API communication
* Unit tests for frontend and backend

## Technologies

### Frontend

* React
* TypeScript
* Vite
* Vitest
* React Testing Library

### Backend

* Go
* Go standard library
* REST API
* `net/http`

## Project Structure

```text
calculator app/

│
├── backend/
│   ├── calculator.go
│   ├── calculator_test.go
│   ├── main.go
│   ├── main_test.go
│   └── go.mod
│
├── frontend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   ├── App.test.tsx
│   │   │   └── setup.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── package-lock.json
│   └── vitest.config.ts
│
└── README.md
```

## Getting Started

### Prerequisites

Before running the application, make sure you have installed:

* Node.js and npm
* Go

### 1. Run the Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Run the Go server:

```bash
go run .
```

The backend runs on:

```text
http://localhost:8080
```

Keep this terminal running.

### 2. Run the Frontend

Open a second terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local URL in the terminal. Open that URL in your browser to use the calculator.

## REST API

The backend exposes the following endpoint:

```text
POST /api/calculate
```

The endpoint accepts a JSON request containing two numbers and an operation.

### Example Request

```json
{
  "a": 10,
  "b": 5,
  "operation": "add"
}
```

Supported operations:

* `add`
* `subtract`
* `multiply`
* `divide`

### Example

For:

```json
{
  "a": 10,
  "b": 5,
  "operation": "multiply"
}
```

the API returns the calculated result as a JSON response.

The API also handles invalid operations and division by zero.

## Testing

### Frontend Tests

From the `frontend` folder, run:

```bash
npm run test
```

The frontend tests use Vitest and React Testing Library to verify calculator functionality, user interaction, input validation, and error handling.

### Backend Tests

From the `backend` folder, run:

```bash
go test ./...
```

The backend tests verify the calculator logic and API behavior.

## Application Flow

The application follows a simple client-server architecture:

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP POST
 ▼
Go REST API
 │
 ▼
Calculation
 │
 ▼
JSON Response
 │
 ▼
React Frontend
 │
 ▼
Result displayed to the user
```

The frontend handles the user interface and sends calculation requests to the backend. The backend performs the calculation and returns the result through the REST API.

## Error Handling

The application includes validation and error handling for common invalid inputs, including:

* Empty input fields
* Invalid numeric values
* Division by zero
* Invalid operations
* Backend/API errors

The frontend displays appropriate feedback to the user when an error occurs.

## Notes

This project was developed as a coding assignment to demonstrate basic full-stack development, REST API integration, validation, error handling, and automated testing.
