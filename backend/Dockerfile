FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install

RUN npm install pm2 -g

COPY --chown=node:node . .

EXPOSE 3001

CMD ["ls"]

# pm2 start src/server.js --name server
CMD pm2 start src/server.js --name server