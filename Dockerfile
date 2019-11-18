FROM node:10.10.0-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm i --production 

COPY . .