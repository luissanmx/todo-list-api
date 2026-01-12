# Todo List API

A Node.js REST API for managing users, todo lists, and list items, using Express, MariaDB, and Sequelize ORM.

## Features
- User signup and signin with JWT authentication
- CRUD operations for todo lists and items
- Sequelize ORM for database access and migrations
- Environment variable configuration

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your `.env` file with database and JWT settings.
3. Run database migrations:
   ```bash
   npm run migrate
   ```
4. Start the server (development):
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

## API Endpoints
- `POST /api/v1/signup` — Register a new user
- `POST /api/v1/signin` — Authenticate and receive a JWT
- `GET /api/v1/lists` — List all lists for the authenticated user
- `POST /api/v1/lists` — Create a new list
- `POST /api/v1/lists/:listId/items` — Add an item to a list
- `GET /api/v1/lists/:listId/items` — List all items in a list
- `PUT /api/v1/lists/:listId/items/:itemId` — Update an item
- `DELETE /api/v1/lists/:listId/items/:itemId` — Delete an item
- `POST /api/v1/change-password` — Change the authenticated user's password (requires current and new password)

## License
MIT
