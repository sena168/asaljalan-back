# String List App

A simple full-stack React application that allows users to enter strings and view them in a persistent list. The backend is designed to be deployed on Render and the frontend on Vercel.

## Service Status

[![Service Status](https://img.shields.io/badge/Service-Online-brightgreen)](https://stats.uptimerobot.com/qdZdWgw3NS)

🔗 **Live Status Page**: [https://stats.uptimerobot.com/qdZdWgw3NS](https://stats.uptimerobot.com/qdZdWgw3NS)

## Features

- Simple input field for entering text strings
- Orange-colored submit button
- Persistent list of entered strings
- Delete functionality for individual strings
- Responsive design
- Full-stack architecture with REST API

## Project Structure

```
asaljalan/
├── backend/          # Node.js/Express API server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   ├── .env          # Environment variables
│   └── render.yaml   # Render deployment config
└── frontend/         # React application
    ├── src/
    │   ├── App.js    # Main React component
    │   ├── App.css   # Styling
    │   ├── index.js  # React entry point
    │   └── index.css # Global styles
    ├── public/
    │   └── index.html
    ├── package.json  # Frontend dependencies
    ├── vercel.json   # Vercel deployment config
    └── .env.example  # Environment variables template
```

## Local Development

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   This will automatically kill any existing process on port 5000 and start the server with nodemon for auto-restart on file changes.

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   
   This will automatically kill any existing process on port 3000 and start the React development server.

   The frontend will run on `http://localhost:3000`
   
   **Alternative:** You can also use `npm start` for the standard React start command.

## Deployment

### Backend Deployment (Render)

1. Push your code to a GitHub repository
2. Connect your GitHub account to Render
3. Create a new Web Service on Render
4. Select your repository and the `backend` folder
5. Render will automatically detect the `render.yaml` configuration
6. The service will be deployed with the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js

### Frontend Deployment (Vercel)

1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import your project and select the `frontend` folder as the root directory
4. Set the environment variable:
   - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com`)
5. Deploy the project

Vercel will automatically:
- Install dependencies
- Build the React app
- Deploy to a global CDN

## Available Scripts

### Backend Scripts
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-restart (kills existing port 5000 process)
- `npm run kill` - Kill any process running on port 5000

### Frontend Scripts
- `npm start` - Start the React development server
- `npm run dev` - Start development server (kills existing port 3000 process first)
- `npm run build` - Build the app for production
- `npm run kill` - Kill any process running on port 3000
- `npm test` - Run tests

## API Endpoints

- `GET /api/strings` - Retrieve all strings
- `POST /api/strings` - Add a new string
- `DELETE /api/strings/:id` - Delete a string by ID
- `GET /health` - Health check endpoint

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS middleware
- In-memory storage (persists during server runtime)

### Frontend
- React 18
- CSS3 with Flexbox
- Fetch API for HTTP requests
- Responsive design

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

For production, update `REACT_APP_API_URL` to your deployed backend URL.

## Notes

- The backend uses in-memory storage, so data will persist during the server session but will be lost on server restart
- For production use, consider implementing a database (PostgreSQL, MongoDB, etc.)
- The app includes error handling and loading states
- CORS is configured to allow cross-origin requests from the frontend