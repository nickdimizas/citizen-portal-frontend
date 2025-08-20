# Citizen Portal Frontend Repo

This repository contains the **frontend** part of the Citizen Portal App.

## Development Mode (Local)

### Prerequisites

- Node.js 20.x (LTS) or 22.x (Current)
- npm

### Run Locally

1. Navigate to the frontend repo and install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser at:

   ```
   http://localhost:5173
   ```

---

## Production Mode (Independent)

⚠️ Production mode requires Docker.

### Build & Run with Docker

1. Build the production-ready Docker image:

   ```bash
   npm run build:docker
   ```

2. Run the container:

   ```bash
   npm run run:docker
   ```

3. Access the frontend in your browser:

   ```
   http://localhost:5173 or http://localhost:8080
   ```
