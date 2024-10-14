FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
EXPOSE 8081
RUN npm install pm2 -g
CMD ["pm2-runtime", "src/index.js"]
