# Dockerfile that sets up an Nginx reverse proxy with SSL.
# Use forward slashes for paths in Dockerfile
# and when running docker commands, even on Windows.
FROM nginx:stable-perl
EXPOSE 8080

COPY ./docker/nginx-reverse-proxy/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx-reverse-proxy/assets/ /var/www/html/assets/
COPY ./docker/nginx-reverse-proxy/index.html /var/www/html/index.html

# Build-time secrets will only be available within the temporary container 
# for a RUN command that uses the --mount=type=secret flag.
# The secrets will therefore not be stored anywhere in the final image.
RUN --mount=type=secret,id=ssl_cert \
    --mount=type=secret,id=ssl_key \
    mkdir -p /etc/nginx/ssl && \
    cp /run/secrets/ssl_cert /etc/nginx/ssl/server.crt && \
    cp /run/secrets/ssl_key /etc/nginx/ssl/server.key

CMD ["nginx", "-g", "daemon off;"]
