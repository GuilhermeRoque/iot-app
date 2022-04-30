# Name the node stage "builder"
FROM node:14
# Set working directory
WORKDIR /root
# Copy all files from current directory to working dir in image
COPY ./src ./src
COPY ./public ./public
COPY package*.json ./
# install node modules and build assets
RUN npm ci
EXPOSE 3000
CMD ["npm", "start"]