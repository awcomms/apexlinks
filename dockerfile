FROM node:18.4.0
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3737
CMD ["node", "build/index.js"]