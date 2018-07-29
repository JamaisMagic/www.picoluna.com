FROM node:alpine as development

WORKDIR /data/app/www.picoluna.com
COPY package.json /data/app/www.picoluna.com/
COPY package-lock.json /data/app/www.picoluna.com/

ENV NODE_ENV development
ENV APP_PORT 8000

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]
