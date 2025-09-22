# Full Stack Product Store

This project is a simple **Full Stack Application** with:

- **Frontend** → React + Vite  
- **Backend** → Express + PostgreSQL  

---

## 📂 Project Structure
project-root/
│── product-managment/ # React frontend
│── product-backend/ # Express backend



## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd project-root

2️⃣ PostgreSQL Setup

Make sure PostgreSQL is installed and running, or you can use Docker:

docker run --name postgres-store \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=asdf \
  -e POSTGRES_DB=store \
  -p 5432:5432 \
  -d postgres

psql -U postgres

Create a .env file inside product-backend/:
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=asdf
DB_NAME=store

npm start

cd ../product-managment
npm install
npm start


