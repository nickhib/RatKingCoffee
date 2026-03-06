# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app
COPY . /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Expose port 4200
EXPOSE 4200

# Command to serve the Angular app
CMD ["ng", "serve","--host", "0.0.0.0"]
