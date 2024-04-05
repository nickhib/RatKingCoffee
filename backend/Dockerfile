# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to start the backend server
CMD ["node", "server.js"]
