# FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from artifact
COPY dist ./dist

# Expose application port
EXPOSE 3000

# Start application
CMD ["node", "dist/index.js"]