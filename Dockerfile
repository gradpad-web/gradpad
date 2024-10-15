# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Command to run the application
CMD ["serve", "-s", "dist"]