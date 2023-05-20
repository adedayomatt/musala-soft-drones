ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

# create databases
CREATE DATABASE IF NOT EXISTS `drones`;
CREATE DATABASE IF NOT EXISTS `drones-test`;