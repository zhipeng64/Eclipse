# build stage, use a heavier image that provides comprehensive
# system-level dependencies to build the application.
# node:24 contains node.js + build tools + comprehensive OS utilities
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
# Removes dev dependencies to reduce image size
RUN npm install --production
COPY ./src/backend ./src

# runtime stage, use a lighter image to run the application since 
# build artifacts are obtained in the previous stage.
# Note that Docker will only keep the image in the last stage
# node:24-slim contains node.js + no build tools + minimal OS utilities
FROM node:24-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
EXPOSE 8080
CMD ["node","src/app.js"]
