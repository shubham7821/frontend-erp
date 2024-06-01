# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from your project into the working directory
COPY package.json package-lock.json* ./

# Install dependencies using npm ci, which is better for reproducible builds
RUN npm ci

# Set environment variables
# ENV MONGO_URI="mongodb://mongo:27017/erp"
ENV TOKEN_SECRET="nextjsyoutube"
ENV DOMAIN="http://localhost:3001"

# Bundle your app's source code inside the Docker container
COPY . .

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 3000

# Define the command to run your app in development mode
CMD ["npm", "run", "dev"]
