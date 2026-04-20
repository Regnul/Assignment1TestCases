FROM node:18-slim
WORKDIR /usr/src/app
# Create a basic package file to handle the express dependency
RUN npm init -y && npm install express
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]