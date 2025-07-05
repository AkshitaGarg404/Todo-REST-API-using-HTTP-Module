# Todo REST API with Node.js (No Framework)

This project is a simple Todo REST API built using Node.js core modules (`http` and `url`) without any external frameworks like Express. It demonstrates basic CRUD operations (Create, Read, Update, Delete) for managing todo items in memory.

## Features
- List all todos
- Get a specific todo by ID
- Add a new todo
- Update an existing todo
- Delete a todo

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation
1. Clone this repository or copy the project files.
2. Navigate to the project directory:
    
3. Install dependencies (if any):
   ```sh
   npm install
   ```
4. Create a `.env` file in the project root and set the port:
   ```env
   PORT=5000
   ```

### Running the Server
```sh
node server.js
```
The server will start and listen on the port specified in your `.env` file.

## API Endpoints

### Get all todos
- **GET** `/todos`
- **Response:** Array of todo objects

### Get a todo by ID
- **GET** `/todos/:id`
- **Response:** Single todo object

### Add a new todo
- **POST** `/todos`
- **Body:** JSON `{ "text": "Task description", "completed": false }`
- **Response:** The created todo object

### Update a todo
- **PUT** `/todos/:id`
- **Body:** JSON (fields to update, e.g. `{ "text": "New text", "completed": true }`)
- **Response:** The updated todo object

### Delete a todo
- **DELETE** `/todos/:id`
- **Response:** `{ success: true, data: {} }`

## Notes
- Todos are stored in memory; data will reset when the server restarts.
- Make sure to send valid JSON in the request body for POST and PUT requests.
- The server returns appropriate error messages for invalid requests.

## Example cURL Commands

**Add a todo:**
```sh
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy groceries"}'
```

**Get all todos:**
```sh
curl http://localhost:5000/todos
```

**Update a todo:**
```sh
curl -X PUT http://localhost:5000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a todo:**
```sh
curl -X DELETE http://localhost:5000/todos/1
```

---

Feel free to modify and extend this project for your learning or prototyping needs!
