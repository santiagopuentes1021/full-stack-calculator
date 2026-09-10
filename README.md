# Full-Stack Calculator

A full-stack calculator application developed as part of a coding assignment for Sezzle.

The application consists of a React frontend and a Go backend connected through a REST API. The frontend is responsible for the user interface and input handling, while the backend performs the arithmetic operations and returns the results in JSON format.

## Features

* Addition
* Subtraction
* Multiplication
* Division
* Division-by-zero validation
* Input validation
* Invalid operation handling
* Backend/API error handling
* Responsive user interface
* REST API communication
* Unit tests for frontend and backend

> Optional operations such as exponentiation, square root, and percentage were not implemented in order to prioritize the required functionality, code clarity, and maintainability within the assignment scope.

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
* `encoding/json`

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

Before running the application, make sure the following are installed:

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

Vite will display the local URL in the terminal. Open that URL in a browser to use the calculator.

## REST API

The backend exposes the following endpoint:

```text
POST /api/calculate
```

The endpoint accepts a JSON request containing two numbers and an operation.

### Request Format

```json
{
  "a": 10,
  "b": 5,
  "operation": "add"
}
```

### Supported Operations

| Operation  | Description    |
| ---------- | -------------- |
| `add`      | Addition       |
| `subtract` | Subtraction    |
| `multiply` | Multiplication |
| `divide`   | Division       |

### Example Request

```http
POST http://localhost:8080/api/calculate
Content-Type: application/json
```

Request body:

```json
{
  "a": 10,
  "b": 5,
  "operation": "multiply"
}
```

### Example Response

```json
{
  "result": 50
}
```

### Error Response

For invalid requests, the API returns a JSON error response.

Example:

```json
{
  "error": "cannot divide by zero"
}
```

The API also handles invalid JSON, unsupported HTTP methods, invalid operations, and division by zero.

## Testing

### Frontend Tests

From the `frontend` folder, run:

```bash
npm run test
```

The frontend tests use Vitest and React Testing Library to verify calculator functionality, user interaction, input validation, and error handling.

To run the frontend tests with coverage:

```bash
npm run test -- --coverage
```

### Backend Tests

From the `backend` folder, run:

```bash
go test ./...
```

The backend tests verify the calculator logic and API behavior.

To run the backend tests with coverage:

```bash
go test ./... -cover
```

The project includes unit tests for both the frontend and backend layers.

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

The frontend handles the user interface, validates the input, and sends calculation requests to the backend.

The backend validates the request, performs the calculation, and returns the result or an error through the REST API.

## Design Decisions

### Separation of responsibilities

The frontend and backend are kept as separate applications.

The React frontend is responsible for:

* User interaction
* Input handling
* Basic client-side validation
* Displaying results and errors

The Go backend is responsible for:

* Performing arithmetic operations
* Validating API requests
* Handling calculation errors
* Returning JSON responses

This separation keeps the application simple and makes each layer easier to test and maintain.

### REST API

A REST endpoint was used to keep communication between the frontend and backend simple and explicit.

The frontend sends calculation data as JSON, and the backend returns either a JSON result or a JSON error response.

### Go standard library

The backend uses Go's standard library instead of an external web framework. For this small application, `net/http` and `encoding/json` provide everything needed while keeping the dependency footprint small.

### Required functionality first

The implementation focuses on the required arithmetic operations and validation instead of adding unnecessary features. Optional operations such as exponentiation, square root, and percentage were intentionally left out to prioritize correctness, readability, and maintainability within the expected assignment scope.

## Error Handling

The application includes validation and error handling for common invalid inputs, including:

* Empty input fields
* Invalid numeric values
* Division by zero
* Invalid operations
* Invalid JSON requests
* Unsupported HTTP methods
* Backend/API connection errors

The frontend displays appropriate feedback to the user when an error occurs.

## AI-Assisted Development

AI tools were used as a development aid during the implementation of this assignment.

AI assistance was used for:

* Understanding the project requirements
* Learning and troubleshooting React, TypeScript, Go, and REST API concepts
* Debugging frontend/backend integration issues
* Troubleshooting CORS configuration
* Developing and reviewing unit tests
* Improving documentation and README structure
* Reviewing the implementation against the assignment requirements

Examples of prompts used during development included:

```text
Help me build a full-stack calculator application with a React frontend and a Go backend REST API. Explain everything step by step because I am a beginner with frontend and backend development.
```

```text
Help me create unit tests for my React calculator using Vitest and React Testing Library.
```

```text
Help me create unit tests for my Go calculator backend and API.
```

```text
My React frontend cannot connect to my Go backend. Help me diagnose the error and explain how to fix it step by step.
```

```text
Review my project against the Sezzle technical assignment requirements and identify anything that is missing before submission.
```

AI-generated suggestions were reviewed and adapted during development, and the final implementation was tested locally.

## Notes

This project was developed as a coding assignment to demonstrate:

* Full-stack development
* React and TypeScript development
* Go backend development
* REST API integration
* Input validation
* Error handling
* Unit testing
* Separation of frontend and backend responsibilities

The implementation intentionally remains small and focused on the required functionality.
