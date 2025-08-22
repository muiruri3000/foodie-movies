# FROM node:21-alpine3.20 AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM busybox:1.30 AS runner
# WORKDIR /app
# COPY --from=builder /app/dist .
# CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]
FROM node:20-alpine3.20 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Use nginx instead of busybox for better static file serving
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]