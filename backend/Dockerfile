# Use a Java 21 base image with Maven
FROM eclipse-temurin:21-jdk AS builder

# Set work directory
WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build the application (skip tests)
RUN apt-get update && apt-get install -y maven && \
    mvn clean package -DskipTests

# ====================
# Run stage
# ====================
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (adjust if you configured differently)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
