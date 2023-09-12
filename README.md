BUILD `docker build -t user-manager:latest .`

RUN `docker run -dP user-manager:latest`

[page link](http://127.0.0.1:5050)

SWARM:

start swarm
RUN `docker swarm init`

add service
RUN `docker service create --name first user-manager:latest`

scale service
RUN `docker service scale first=7`

check services
RUN `docker service ps first`

remove services
RUN `docker service rm first`