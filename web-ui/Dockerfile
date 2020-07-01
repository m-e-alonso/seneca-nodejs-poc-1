FROM node

WORKDIR /app/web-ui

ENV PATH /app/web-ui/node_modules/.bin:$PATH

COPY ./web-ui/package.json ./
COPY ./web-ui/package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g

COPY ./web-ui/. .

WORKDIR /app/domain-shared

COPY ./domain-shared/. .

EXPOSE 3000

WORKDIR /app/web-ui

CMD ["npm", "start"]


