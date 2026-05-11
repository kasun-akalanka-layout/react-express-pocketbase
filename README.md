# React + Express + PocketBase Application

A full-stack web application built with React, Express, and PocketBase. This project uses Docker Compose to orchestrate three services: a React frontend, an Express backend API, and a PocketBase database.

## Project Structure

```
react-express-pocketbase/
├── backend/                    # Express.js API server
│   ├── Dockerfile            # Docker configuration for backend
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express server entry point
├── frontend/                   # React application (Vite)
│   ├── Dockerfile            # Docker configuration for frontend
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── eslint.config.js      # ESLint configuration
│   ├── index.html            # HTML entry point
│   ├── src/                  # React components and styles
│   │   ├── App.jsx           # Main React component
│   │   ├── main.jsx          # React DOM render
│   │   ├── App.css           # Application styles
│   │   ├── index.css         # Global styles
│   │   └── assets/           # Static assets
│   └── public/               # Public static files
├── pocketbase/                 # PocketBase configuration
│   └── Dockerfile            # Docker configuration for PocketBase
├── pb_data/                    # PocketBase data storage
│   └── types.d.ts            # TypeScript type definitions
├── docker-compose.yml        # Docker Compose orchestration
└── README.md                 # This file
```

## Prerequisites

- **Docker Desktop** - Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Docker Compose** - Included with Docker Desktop
- Or alternatively: **Node.js 22+** and **npm** for local development

## Quick Start

### Using Docker Compose (Recommended)

1. **Start all services:**
   ```bash
   docker compose up
   ```
   This will build and start:
   - PocketBase at http://localhost:8080
   - Express API at http://localhost:3001
   - React Frontend at http://localhost:5173

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - PocketBase Admin: http://localhost:8080/_/

3. **Stop the services:**
   ```bash
   docker compose down
   ```

## Creating a PocketBase Collection

1. **Access PocketBase Admin Panel:**
   - Navigate to http://localhost:8080/_/
   - Log in or create an admin account on first access

2. **Create a new collection:**
   - Click "Collections" in the left sidebar
   - Click the "New collection" button
   - Enter collection name (e.g., "orders")

3. **Add fields to your collection:**
   - Click "New field" to add fields
   - Example fields for "orders" collection:
     - `id` (Auto ID) - Primary identifier
     - `status` (Text) - e.g., "pending", "completed"
     - `created` (Date) - Auto-populated creation date
     - `updated` (Date) - Auto-populated update date

4. **Save the collection**

The application is pre-configured with an "orders" collection. The backend API expects this collection to exist.

## Services and Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend (React) | 5173 | http://localhost:5173 |
| Backend (Express) | 3001 | http://localhost:3001 |
| PocketBase | 8080 | http://localhost:8080 |
| PocketBase Admin | 8080 | http://localhost:8080/_/ |

## API Endpoints

### Orders API

The backend provides the following REST API endpoints:

- **GET /orders** - Retrieve all orders
- **POST /orders** - Create a new order
- **PATCH /orders/:id** - Update an order status
- **DELETE /orders/:id** - Delete an order

### Example API Calls

```bash
# Get all orders
curl http://localhost:3001/orders

# Create a new order
curl -X POST http://localhost:3001/orders \
  -H "Content-Type: application/json" \
  -d '{"status":"pending"}'

# Update order status
curl -X PATCH http://localhost:3001/orders/ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete an order
curl -X DELETE http://localhost:3001/orders/ORDER_ID
```

## Environment Variables

### Backend (.env or docker-compose.yml)

- `PB_URL` - PocketBase URL (default: `http://pocketbase:8080`)

### Frontend (Dockerfile)

- `VITE_PB_URL` - PocketBase URL for frontend (default: `http://localhost:8080`)

## Technology Stack

### Frontend
- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **PocketBase SDK** - Database client
- **ESLint** - Code quality

### Backend
- **Express 5** - Web framework
- **Node.js 22** - Runtime
- **PocketBase SDK** - Database client
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management

### Database
- **PocketBase** - Open-source backend-as-a-service platform
