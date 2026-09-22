FROM eclipse-temurin:21-jre-jammy

# Usuario no-root (la guía pide verificar el usuario "appuser" y el volumen)
RUN groupadd -g 10001 appuser && useradd -u 10001 -g appuser -s /usr/sbin/nologin appuser \
 && mkdir -p /frgmount/gemalto /var/cache/cadp \
 && chown -R appuser:appuser /frgmount /var/cache/cadp

WORKDIR /app
COPY target/crypto-bridge-svc-*.jar app.jar

USER 10001
EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar /app/app.jar"]
