# Citizen Portal Frontend

The frontend application for the **Citizen Portal**, built with **Vite**, **React**, **TypeScript**, and **Material UI**.

---

### **Table of Contents**

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Production Build](#production-build)

---

### **Overview**

This is the **frontend** for the Citizen Portal. It provides the user interface for citizens and administrators to interact with the backend services.

Key technologies used:

- **React + TypeScript** for building the UI
- **Vite** for fast development and build tooling
- **Material UI (MUI)** for styling and UI components

The frontend communicates with the [Citizen Portal Backend](https://github.com/nickdimizas/citizen-portal-backend.git) for authentication, user management, and data services.

---

### **Prerequisites**

- **Node.js**: Version 20.x (LTS) or 22.x (Current) recommended
- A running instance of the [Citizen Portal Backend](https://github.com/nickdimizas/citizen-portal-backend.git)

---

### **Getting Started**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nickdimizas/citizen-portal-frontend.git
    cd citizen-portal-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Copy the `.env.example` file to create your `.env.development` file.
    ```bash
    cp .env.example .env.development
    ```

---

### **Environment Variables**

The frontend uses environment variables to configure its behavior. These variables are handled by Vite and must be prefixed with `VITE_`.

| Variable Name  | Description                                                         | Example Value           |
| :------------- | :------------------------------------------------------------------ | :---------------------- |
| `VITE_API_URL` | The URL of the backend API.                                         | `http://localhost:5000` |
| `VITE_USE_MSW` | **(Optional)** A flag to enable or disable the Mock Service Worker. | `true` or `false`       |

**Note:** If `VITE_USE_MSW` is set to `true`, the application will use mocked API calls instead of a live backend.

---

### **Running the Application**

After you have a running instance of the backend, you can start the frontend application.

```bash
npm run dev
```
