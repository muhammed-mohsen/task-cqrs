FROM node:18-alpine

WORKDIR /app


COPY package.json yarn.lock ./

RUN yarn 

# Copy the rest of the application code
COPY . .



CMD ["yarn", "start:dev"]
