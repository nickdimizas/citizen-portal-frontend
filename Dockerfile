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