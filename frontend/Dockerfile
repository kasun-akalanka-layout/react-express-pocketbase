FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

ENV VITE_PB_URL=http://localhost:8080

CMD ["npm", "run", "dev", "--", "--host"]