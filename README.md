[![Deploy to DigitalOcean](https://github.com/Ramadhan0/url-shortener-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ramadhan0/url-shortener-api/actions/workflows/deploy.yml)

_________________________________________________________

# 🚀 URL Shortener Backend

This is a URL shortener backend built using **Node.js**, **Express.js**, **Sequelize (PostgreSQL)**, and **Redis**.

---

Backend production url: 
```sh
http://137.184.36.97:5551
```
----

## 🏗️ Setting Up the Project Locally

#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Ramadhan0/url-shortener-api.git
cd url-shortener
```

### To run Project locally using Docker Compose
#### 📌 Prerequisites

Before running this application, make sure you have the following installed:

- **Docker & Docker Compose** 🐳

##### Start Project
```sh
docker-compose up --build
```

-----

### To run Project Manually

#### 📌 Prerequisites

Before running this application, make sure you have the following installed:

- **Docker & Docker Compose** 🐳
- **Node.js (v18 or later)**
- **npm or yarn**

#### 1️⃣ Create a .env File
```
PORT=5552

# PostgreSQL Config
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=pst_db_pd_2**7n
DB_NAME=url_shortener_db

# Redis Config
REDIS_URL=redis://default:redis_db_pd_1*7@localhost:6379

ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
JWT_SECRET=your_jwt_secret_key
ACCESS_TOKEN_SECRET=your_access_token_secret  
REFRESH_TOKEN_SECRET=your_refresh_token_secret  
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
