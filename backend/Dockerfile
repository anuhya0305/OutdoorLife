FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src src
RUN mvn -q package -DskipTests

FROM eclipse-temurin:17-jre
COPY --from=build /app/target/outdoorlife-api-1.0.0.jar /app.jar
# Render free tier gives ~0.1 CPU: C1-only JIT and a single-threaded GC cut startup time.
CMD ["java", "-XX:TieredStopAtLevel=1", "-XX:+UseSerialGC", "-Xss512k", "-XX:MaxRAMPercentage=75", "-jar", "/app.jar"]
