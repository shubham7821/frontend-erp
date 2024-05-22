# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) from your project into the working directory
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
# Using npm ci here for cleaner installs based on package-lock.json
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    else npm install; fi

# Set environment variables
ENV MONGO_URI="mongodb://127.0.0.1:27017/erp"
ENV TOKEN_SECRET="nextjsyoutube"
ENV DOMAIN="http://localhost:3001"

# Bundle your app's source code inside the Docker container
COPY . .

# Build your Next.js application (optional in dev, depending on how you want to handle builds)
# RUN npm run build

# Inform Docker that the container listens on the specified port at runtime.
# Default Next.js dev port is 3000, change if your dev server uses a different one
EXPOSE 3000

# Define the command to run your app in development mode
CMD ["npm", "run", "dev"]
