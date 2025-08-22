FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

# Set environment variables for the build
ENV NODE_ENV=production
ENV VITE_API_URL=/api

RUN npm run build

EXPOSE 3000

# Explicitly specify port and enable SPA routing
CMD ["serve", "-s", "dist", "-l", "3000", "--single"]