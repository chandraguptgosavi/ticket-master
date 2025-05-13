ARG MAVEN_VERSION=3.9.9-eclipse-temurin-21-alpine
ARG ECLIPSE_TEMURIN_VERSION=21.0.7_6-jre-alpine-3.21

FROM maven:${MAVEN_VERSION} AS base

WORKDIR /app

COPY pom.xml .

RUN --mount=type=cache,target=/root/.m2 \
    mvn dependency:go-offline -B

COPY src ./src

RUN --mount=type=cache,target=/root/.m2 \
    mvn package -DskipTests -B

FROM eclipse-temurin:${ECLIPSE_TEMURIN_VERSION} AS final

WORKDIR /app

COPY --from=base /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
