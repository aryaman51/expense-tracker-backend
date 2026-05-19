FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY init.sql ./
COPY src ./src
COPY metrics ./metrics

EXPOSE 5000
CMD ["npm", "start"]