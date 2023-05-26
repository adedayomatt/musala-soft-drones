#!/usr/bin/env bash

chown -R www-data:www-data /home/node

mkdir -p /var/log/application && \
chmod -R 777 /var/log/application
chown -R www-data:www-data /var/log/application && \

npm install
node database/sync.js
npm start
