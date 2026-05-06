FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using npm ci for consistency
RUN npm ci --production

# Copy application code
COPY . .

EXPOSE 3001

# Start the application
CMD ["node", "server.js"]