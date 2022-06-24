FROM node:18.4.0
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3737
ENV X_CUSTOM_HOST=127.0.0.1
ENV X_CUSTOM_PORT=3737
CMD ["node", "build/index.js"]