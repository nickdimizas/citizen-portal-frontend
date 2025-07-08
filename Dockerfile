# Stage 1: Build the React application for production
# This stage compiles your React code into static assets.
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's layer caching.
# This step only invalidates the cache if these specific files change.
COPY package*.json ./

# Install project dependencies.
# Using 'npm install' as requested, which is more flexible for adding dependencies.
# For strict, reproducible builds (e.g., in CI/CD), 'npm ci' is often preferred.
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the React application for production.
# Vite typically outputs the production build to the 'dist' directory.
RUN npm run build

# Stage 2: Development environment
# This stage creates an image for running the Vite development server inside Docker.
FROM node:20-alpine AS development

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json again for the development stage.
COPY package*.json ./

# Install dependencies for the development environment.
# This ensures all devDependencies are available for 'npm run dev'.
RUN npm install

# Copy the full source code for development (including non-built files).
COPY . .

# Expose the default port for Vite's development server.
# This port needs to be mapped from your host when running the container.
EXPOSE 5173

# Command to run the Vite development server when the container starts.
# Ensure your package.json has a "dev" script, e.g., "dev": "vite".
CMD ["npm", "run", "dev"]

# Stage 3: Production environment
# This stage creates a lightweight image to serve the built static assets using Nginx.
FROM nginx:alpine AS production

# Copy the production build artifacts from the 'build' stage.
# The 'dist' directory contains the optimized static files from 'npm run build'.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80, which Nginx listens on by default for HTTP traffic.
EXPOSE 80

# Command to run Nginx in the foreground when the container starts.
CMD ["nginx", "-g", "daemon off;"]
