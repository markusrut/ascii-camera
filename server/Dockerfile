FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/main.js"]