# Build
FROM maven:3.8.4 AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

# Package
FROM openjdk:17.0.2
COPY --from=build /home/app/target/drones-0.0.1-SNAPSHOT.jar /usr/local/lib/drones.jar

VOLUME /tmp
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/drones.jar"]