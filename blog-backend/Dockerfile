FROM maven:3.9-eclipse-temurin-17-alpine AS MAVEN_BUILD
COPY pom.xml /build/
COPY mvnw /build/
COPY .mvn /build/.mvn
COPY src /build/src/
WORKDIR /build/
RUN mvn clean package -DskipTests -e

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/redy-blog-api-0.1.jar /app/redy-blog-api.jar
EXPOSE 9003
ENTRYPOINT [ "java", "-jar", "/app/redy-blog-api.jar" ]