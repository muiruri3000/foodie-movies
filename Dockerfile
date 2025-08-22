FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

ENV NODE_ENV=production
ENV VITE_API_URL=/api

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000", "--single"]