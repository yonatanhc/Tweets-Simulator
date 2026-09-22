# crypto-bridge-svc

Expone `era-encryption-utility` 7.0.0-jdk21 por HTTP (Spring Boot 3.3, Java 21).

```
POST /api/v1/crypto/{encrypt|decrypt|tokenize|detokenize}
[{"field":"cardNumber","value":"4111111111111111"}]
```

## 1. Local sin CipherTrust (contrato HTTP)
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mock
```

## 2. Local contra CipherTrust DEV
Requisitos: VPN/red corporativa, `settings.xml` con credenciales de Artifactory,
archivos y secretos de Nivel 1 entregados por EKM.

```bash
# conectividad (ambos hosts de nae_ip1, puerto 9085)
nc -vz ctmdevnv.sharedservices.awswuintranet.net 9085

cp CADP_for_JAVA.properties client_keystore_*.jks local/gemalto/
chmod 400 local/gemalto/*
cp local/env.example local/.env   # completar
set -a; source local/.env; set +a
mvn spring-boot:run               # perfil "local" por defecto

curl -s localhost:8080/actuator/health/readiness
```

## 3. Kubernetes
`k8s/`: Deployment (initContainer que deja los archivos con chmod 400 como appuser),
Service, ConfigMap, NetworkPolicy de egress a 9085 y ejemplo de Secrets.
El pipeline (`.gitlab-ci.yml`) compila, testea con perfil mock, construye la imagen con
Kaniko y deja los manifests renderizados para el equipo que despliega.
