FROM node:22-alpine
WORKDIR /app
ADD . /app
RUN npm install
CMD [ "npm", "start" ]
