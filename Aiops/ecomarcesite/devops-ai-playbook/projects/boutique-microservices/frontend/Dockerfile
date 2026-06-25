# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production=false

# Copy source code and build
COPY . .

# Set environment variable for build time
ENV REACT_APP_API_URL=/api

# Build the app
RUN npm run build

# Stage 2: Serve the build files using Nginx
FROM nginx:alpine

# Copy the built files from the build stage to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
