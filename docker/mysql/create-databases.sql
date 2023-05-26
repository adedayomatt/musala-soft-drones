ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

# create databases
CREATE DATABASE IF NOT EXISTS `java-drones`;
CREATE DATABASE IF NOT EXISTS `node-drones`;