docker swarm init --advertise-addr 10.60.204.102

docker stack deploy --compose-file /data/app/www.picoluna.com/docker-compose.yml www_picoluna_com

docker stack services www_picoluna_com
docker stack ps www_picoluna_com
