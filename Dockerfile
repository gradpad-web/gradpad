# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (use npm ci for faster, cleaner installs)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application
FROM node:20-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy only the build artifacts from the first stage
COPY --from=builder /app/dist ./dist

# Expose the port where the app will run
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "dist"]
