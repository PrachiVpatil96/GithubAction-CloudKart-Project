# CloudKart - 3 Tier Application Deployment

## Project Overview

CloudKart is a full-stack 3-tier application built using:

* Frontend: React.js
* Backend: Node.js + Express.js
* Database: PostgreSQL
* Containerization: Docker
* Multi-Container Orchestration: Docker Compose
* CI/CD: GitHub Actions
* Container Registry: DockerHub

This project demonstrates a real-world DevOps workflow including:

* Multi-container application deployment
* Docker networking
* Persistent database storage
* CI/CD pipeline automation
* Docker image build and push
* Backend-to-database communication
* Frontend-to-backend API communication

---

# 3-Tier Architecture

```text
                Users
                   |
                   v
        ---------------------
        |    Frontend       |
        |      React        |
        ---------------------
                   |
                   v
        ---------------------
        |     Backend       |
        | Node.js + Express |
        ---------------------
                   |
                   v
        ---------------------
        |    PostgreSQL     |
        |     Database      |
        ---------------------
```

---

# Tech Stack

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| React.js       | Frontend UI                |
| Node.js        | Backend Runtime            |
| Express.js     | Backend Framework          |
| PostgreSQL     | Database                   |
| Docker         | Containerization           |
| Docker Compose | Multi-container management |
| GitHub Actions | CI/CD Pipeline             |
| DockerHub      | Container Registry         |

---

# Project Structure

```text
GithubAction-CloudKart-Project/
│
├── Frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── Backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── config/
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
│
├── .github/
│   └── workflows/
│       └── cicd.yml
│
└── README.md
```

---

# Features

* Full-stack 3-tier application
* REST API backend
* PostgreSQL integration
* Dockerized frontend and backend
* Persistent PostgreSQL volume
* Automated database initialization
* Docker Compose orchestration
* CI/CD pipeline using GitHub Actions
* DockerHub image push automation
* Health check endpoint

---

# Prerequisites

Before starting, install:

* Git
* Docker Desktop
* Docker Compose
* Node.js 24
* DockerHub Account
* GitHub Account

---

# Clone Repository

```bash
git clone https://github.com/PrachiVpatil96/GithubAction-CloudKart-Project.git
```

Move into project directory:

```bash
cd GithubAction-CloudKart-Project
```

---

# Backend Setup

Move into backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Backend dependencies:

```bash
npm install express cors dotenv pg
```

---

# Frontend Setup

Move into frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

---

# PostgreSQL Database Setup

The PostgreSQL database container is automatically created using Docker Compose.

Database initialization script:

```text
database/init.sql
```

This file automatically:

* Creates tables
* Inserts sample data

Example:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price INTEGER
);

INSERT INTO products(name, price)
VALUES
('Laptop', 50000),
('Phone', 25000);
```

---

# Backend Environment Variables

Create `.env` file inside Backend folder.

```env
PORT=5000
DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=password
DB_NAME=productsdb
```

---

# Backend Database Configuration

Create:

```text
Backend/config/db.js
```

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = pool;
```

---

# Backend Server

Example:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', productRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'Backend Running'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# Frontend API Example

```javascript
useEffect(() => {
  fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);
```

---

# Frontend Dockerfile

```dockerfile
FROM node:24 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
```

---

# Backend Dockerfile

```dockerfile
FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

---

# Docker Compose Configuration

```yaml
version: '3.9'

services:

  frontend:
    build: ./Frontend
    container_name: prachi-frontend

    restart: always

    ports:
      - "3000:3000"

    depends_on:
      - backend

    stdin_open: true
    tty: true

    networks:
      - cloudkart-network


  backend:
    build: ./Backend
    container_name: prachi-backend

    restart: always

    ports:
      - "5000:5000"

    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: admin
      DB_PASSWORD: password
      DB_NAME: productsdb

    depends_on:
      postgres:
        condition: service_healthy

    networks:
      - cloudkart-network


  postgres:
    image: postgres:15
    container_name: prachi-postgres

    restart: always

    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: productsdb

    ports:
      - "5432:5432"

    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5

    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql

    networks:
      - cloudkart-network


volumes:
  postgres-data:


networks:
  cloudkart-network:
```

---

# Build and Run Application

Build containers:

```bash
docker compose build
```

Run containers:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

---

# Access Application

| Service              | URL                                                              |
| -------------------- | ---------------------------------------------------------------- |
| Frontend             | [http://localhost:3000](http://localhost:3000)                   |
| Backend Health Check | [http://localhost:5000/health](http://localhost:5000/health)     |
| Products API         | [http://localhost:5000/products](http://localhost:5000/products) |

---

# Docker Networking

Docker Compose automatically creates networking between containers.

Backend communicates with PostgreSQL using:

```javascript
host: 'postgres'
```

NOT:

```javascript
host: 'localhost'
```

Because inside Docker:

```text
localhost = same container
```

---

# Persistent Database Storage

Docker volume:

```yaml
volumes:
  - postgres-data:/var/lib/postgresql/data
```

ensures database data remains safe even if containers stop.

---

# CI/CD Pipeline Using GitHub Actions

Create:

```text
.github/workflows/cicd.yml
```

```yaml
name: CloudKart CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:

  build-test-deploy:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Validate Docker Compose
        run: docker compose config

      - name: DockerHub Login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Frontend Image
        run: |
          docker build \
          -t ${{ secrets.DOCKER_USERNAME }}/prachi-frontend:latest \
          ./Frontend

      - name: Build Backend Image
        run: |
          docker build \
          -t ${{ secrets.DOCKER_USERNAME }}/prachi-backend:latest \
          ./Backend

      - name: Push Frontend Image
        run: |
          docker push \
          ${{ secrets.DOCKER_USERNAME }}/prachi-frontend:latest

      - name: Push Backend Image
        run: |
          docker push \
          ${{ secrets.DOCKER_USERNAME }}/prachi-backend:latest

      - name: Run Docker Compose
        run: docker compose up -d

      - name: Check Running Containers
        run: docker ps

      - name: Test Backend Health
        run: curl http://localhost:5000/health
```

---

# GitHub Secrets

Inside GitHub repository settings, add:

| Secret Name     | Description                     |
| --------------- | ------------------------------- |
| DOCKER_USERNAME | DockerHub username              |
| DOCKER_PASSWORD | DockerHub access token/password |

---

# DockerHub Images

Frontend image:

```text
<dockerhub-username>/prachi-frontend:latest
```

Backend image:

```text
<dockerhub-username>/prachi-backend:latest
```

---

# Common Docker Commands

Build containers:

```bash
docker compose build
```

Start containers:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

View logs:

```bash
docker logs prachi-backend
```

List running containers:

```bash
docker ps
```

Restart containers:

```bash
docker compose restart
```

---

# Troubleshooting

## PostgreSQL Connection Error

Error:

```text
ECONNREFUSED 127.0.0.1:5432
```

Reason:

Using:

```javascript
host: 'localhost'
```

Fix:

```javascript
host: 'postgres'
```

---

## Docker Build Path Error

Error:

```text
unable to prepare context
```

Reason:

Incorrect folder name.

Check:

```text
Frontend ≠ frontend
```

Linux is case-sensitive.

---

## Port Already In Use

Error:

```text
port is already allocated
```

Fix:

Stop existing containers:

```bash
docker compose down
```

---

# Future Improvements

* Kubernetes Deployment
* AWS EC2 Deployment
* AWS EKS Deployment
* Terraform Infrastructure
* NGINX Reverse Proxy
* HTTPS with SSL
* Monitoring with Prometheus and Grafana
* Redis Caching
* Jenkins Pipeline
* Auto Scaling

---

# DevOps Concepts Covered

| Concept               | Covered |
| --------------------- | ------- |
| Docker                | Yes     |
| Docker Compose        | Yes     |
| Node.js Backend       | Yes     |
| PostgreSQL            | Yes     |
| CI/CD Pipeline        | Yes     |
| Docker Networking     | Yes     |
| Persistent Volumes    | Yes     |
| Environment Variables | Yes     |
| GitHub Actions        | Yes     |
| DockerHub             | Yes     |
| 3-Tier Architecture   | Yes     |

---

# Author

Prachi Patil

GitHub Repository:

[https://github.com/PrachiVpatil96/GithubAction-CloudKart-Project](https://github.com/PrachiVpatil96/GithubAction-CloudKart-Project)
