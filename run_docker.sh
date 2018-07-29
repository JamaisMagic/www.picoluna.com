#!/usr/bin/bash


git pull origin master:master && \
if [ "$1" == "build" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml build
elif [ "$1" == "up" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml up -d --build --scale www_picoluna_com=2
elif [ "$1" == "recreate" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml up -d --build --scale www_picoluna_com=2 --force-recreate
elif [ "$1" == "restart" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml restart
elif [ "$1" == "stop" ]; then
    docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml stop
elif [ "$1" == "static" ]; then
    echo "Deploy static files."
else
    echo "Unexpected parameter: $1"
fi
