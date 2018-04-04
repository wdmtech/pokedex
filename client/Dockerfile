FROM node:9

WORKDIR /var/www
COPY . /var/www

RUN npm --user root --unsafe-perm true install npm -g

RUN npm install -g --silent \
    yarn \
    vue-cli

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
