[![Deploy to DigitalOcean](https://github.com/Ramadhan0/url-shortener-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ramadhan0/url-shortener-api/actions/workflows/deploy.yml)

_________________________________________________________
# 🚀 URL Shortener Backend

This is a URL shortener backend built using **Node.js**, **Express.js**, **Sequelize (PostgreSQL)**, and **Redis**.

## 📌 Prerequisites

Before running this application, make sure you have the following installed:

- **Docker & Docker Compose** 🐳
- **Node.js (v18 or later)**
- **npm or yarn**

---

## 🏗️ Setting Up the Project

#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/url-shortener.git
cd url-shortener
```

#### 1️⃣ Create a .env File
```
PORT=5000

# PostgreSQL Config
PORT=5551

# PostgreSQL Config
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=pst_db_pd_2**7n
DB_NAME=url_shortener_db

# Redis Config
REDIS_URL=redis://default:redis_db_pd_1*7@localhost:6379
```


#### 🐳 Running PostgreSQL & Redis with Docker

```sh
docker-compose up -d
```


### 🚀 Running the Application
#### 1️⃣ Install Dependencies
```sh
npm install
```
#### 2️⃣ Run Migrations (if using Sequelize)
```sh
npx sequelize db:migrate
```
#### 3️⃣ Start the Backend Dev Server

```sh
npm run start-dev
```
