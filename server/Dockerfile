FROM node:16.17.1-alpine

WORKDIR '/usr/src/app/server'

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]