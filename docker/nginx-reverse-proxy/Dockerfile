# Dockerfile that sets up an Nginx reverse proxy with SSL.
# Use forward slashes for paths in Dockerfile
# and when running docker commands, even on Windows.

# Build stage: Build the frontend assets
FROM node:20 AS builder

# Do not set working directory to root '/', as 
# package managers like npm may encounter permission
# issues. Instead, create a dedicated working directory like /app.
WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./vite.config.js ./vite.config.js
COPY ./vitest.config.js ./vitest.config.js
COPY ./src/frontend/ ./src/frontend
RUN npm install \
    && npm run build


# Production Stage 
FROM nginx:stable-perl
COPY ./docker/nginx-reverse-proxy/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/src/frontend/dist/ /var/www/html/

# Build-time secrets will only be available within the temporary container 
# for a RUN command that uses the --mount=type=secret flag.
# The secrets will therefore not be stored anywhere in the final image.
RUN --mount=type=secret,id=ssl_cert \
    --mount=type=secret,id=ssl_key \
    mkdir -p /etc/nginx/ssl && \
    cp /run/secrets/ssl_cert /etc/nginx/ssl/server.crt && \
    cp /run/secrets/ssl_key /etc/nginx/ssl/server.key

CMD ["nginx", "-g", "daemon off;"]
