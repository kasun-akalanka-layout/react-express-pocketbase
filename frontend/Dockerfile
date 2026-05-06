FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for Vite)
RUN npm install

# Copy application code
COPY . .

EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]