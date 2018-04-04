FROM node:8-alpine
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*

WORKDIR /var/www/

ENV NODE_ENV=development

COPY . /var/www

RUN npm install

EXPOSE 3030
