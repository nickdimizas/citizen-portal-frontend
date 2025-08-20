# Citizen Portal Frontend Repo

This repository contains the **frontend** part of the Citizen Portal App.

## Development Mode (Local)

### Prerequisites

- Node.js 20.x (LTS) or 22.x (Current)
- npm

### Run Locally

1. Clone this repository and install dependencies:

   ```bash
   git clone <frontend-repo-url>
   cd <frontend-repo-folder>
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. You can now access the frontend at:
   ```
   http://localhost:5173
   ```

---

## Production Mode (Independent)

> ⚠️ Production mode requires **Docker**.

1. Clone this repository and install dependencies:

   ```bash
   git clone <frontend-repo-url>
   cd <frontend-repo-folder>
   npm install
   ```

2. Build the production-ready Docker image and run the container:

   ```bash
   npm run setup:docker
   ```

3. You can now access the frontend at:
   ```
   http://localhost:5173 or http://localhost:8080
   ```
