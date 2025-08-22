# Stage 1: Build React app
FROM node:20 AS builder
WORKDIR /app

# Copy only package files first to leverage caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build for production
RUN npm run build

# Debug stage to see what was built
FROM alpine:latest
WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist

# Install curl and busybox httpd for debugging
RUN apk add --no-cache curl busybox-extras

# List files for debugging
RUN echo "Built files:" && ls -la dist/

EXPOSE 3000
CMD ["httpd", "-f", "-h", "/app/dist", "-p", "3000"]