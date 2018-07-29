docker-compose  -f /data/app/www.picoluna.com/docker-compose.yml up -d --scale www_picoluna_com_01=2 --force-recreate

docker-compose -f /data/app/docker/docker-compose.yml  -f /data/app/www.picoluna.com/docker-compose.yml build
