FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /usr/app

COPY package*.json ./

USER node

RUN npm install yarn

COPY --chown=node:node . .

EXPOSE 3333

CMD ["yarn","dev"]