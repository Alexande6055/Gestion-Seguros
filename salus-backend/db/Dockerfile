FROM postgres:15

# Variables de entorno para usuario, contraseña y base de datos inicial
ENV POSTGRES_USER=alexander
ENV POSTGRES_PASSWORD=asd1230A
ENV POSTGRES_DB=segurosdb

# Copia el script SQL para que PostgreSQL lo ejecute al iniciar el contenedor
COPY init.sql /docker-entrypoint-initdb.d/

# Puerto por defecto de PostgreSQL
EXPOSE 5432
