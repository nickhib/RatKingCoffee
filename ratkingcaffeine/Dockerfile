# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory
WORKDIR /ratkingcaffeine

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4200
EXPOSE 4200

# Command to serve the Angular app
CMD ["ng", "serve"]
