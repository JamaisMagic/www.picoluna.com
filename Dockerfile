FROM node:10.15.0-alpine as development

WORKDIR /data/app/www.picoluna.com
COPY ./package.json /data/app/www.picoluna.com/
COPY ./package-lock.json /data/app/www.picoluna.com/

ENV NODE_ENV development
ENV APP_PORT 8000

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

EXPOSE 8000

CMD [ "node", "/data/app/www.picoluna.com/app/index.js" ]
