FROM node:20.5.1-alpine

RUN mkdir -p /home/usr/app/node_modules && chown -R node:node /home/usr/app

WORKDIR /home/usr/app

COPY package*.json ./

RUN npm i --legacy-peer-deps

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3333

CMD ["npm","run","dev"]