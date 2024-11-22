# Dockerfile para Spring Boot backend
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
Expose 8080
ENTRYPOINT ["java","-jar","/app.jar"]
