# Stage 1: Build
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./.env

# Install only production dependencies and clean npm's cache
RUN npm install --production && npm cache clean --force

# # Set the non-root user to run the application
USER node

# Expose the port the app runs on
EXPOSE 8000

# Define a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3  CMD curl --fail http://localhost:8000/healthcheck || exit 1

# Start the application
CMD ["node", "dist/index.js"]

