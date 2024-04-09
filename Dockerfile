FROM node:20.5.1-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm i --legacy-peer-deps
# RUN npm i -g ts-node-dev

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3333


CMD ["npm","run","dev"]