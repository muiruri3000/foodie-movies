# Stage 1: Build React app
FROM node:20
WORKDIR /app

# Copy only package files first to leverage caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build for production
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "preview"]
# # Stage 2: Serve with Nginx
# FROM nginx:alpine

# # Copy build artifacts from previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]