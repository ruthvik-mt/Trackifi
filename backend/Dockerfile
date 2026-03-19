# Use a Java 21 base image with Maven for building
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copy Maven wrapper and pom first for better layer caching
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Download dependencies (cached unless pom.xml changes)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# ====================
# Run stage (lightweight JRE only)
# ====================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
