# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets
# docker build -t react-test -f test.dockerfile .
# docker run --rm -it -p 8080:3000 react-test

# Name the node stage "builder"
FROM node:14
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY ./src ./src
COPY ./public ./public
COPY package*.json ./
# install node modules and build assets
RUN npm ci
EXPOSE 3000
CMD ["npm", "start"]