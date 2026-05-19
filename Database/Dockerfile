FROM postgres:15

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=productsdb

COPY init.sql /docker-entrypoint-initdb.d/