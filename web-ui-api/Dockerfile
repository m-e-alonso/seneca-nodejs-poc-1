FROM node:12

WORKDIR /usr/src/web-ui-api

COPY ./web-ui-api/package*.json ./

RUN npm install

COPY ./web-ui-api/* ./

WORKDIR /usr/src/domain-shared

COPY ./domain-shared/. .

EXPOSE 8080

WORKDIR /usr/src/web-ui-api

CMD [ "node", "index.js" ]
