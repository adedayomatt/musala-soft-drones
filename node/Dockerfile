FROM node:16.20.0
RUN mkdir -p /var/log/application/node_drones

WORKDIR /home/node
COPY package.json /home/node
COPY . /home/node

RUN npm install nodemon -g

RUN chmod +x ./bin/start.sh /home/node/bin/start.sh

EXPOSE 80

CMD [ "/home/node/bin/start.sh" ]