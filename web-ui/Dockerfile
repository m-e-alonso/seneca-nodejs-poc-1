FROM node as build-stage

WORKDIR /app/web-ui

ENV PATH /app/web-ui/node_modules/.bin:$PATH

COPY ./web-ui/package.json ./
COPY ./web-ui/package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g

COPY ./web-ui/. .

WORKDIR /app/domain-shared

COPY ./domain-shared/. .

WORKDIR /app/web-ui

RUN npm run build

FROM nginx

COPY --from=build-stage /app/web-ui/build/ /usr/share/nginx/html

COPY ./web-ui/nginx.conf /etc/nginx/conf.d/default.conf


