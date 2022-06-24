FROM node:18.4.0
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3737
CMD ["node", "build/index.js"]