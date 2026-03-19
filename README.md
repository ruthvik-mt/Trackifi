# 📊 Trackifi

A full-stack web app to help users track expenses and manage spending with visual insights.

## Table of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

Trackifi is a personal finance web app that empowers users to manage spending, track expenses, set budgets, and gain financial insights through intuitive visualizations.

The frontend is built using React, TypeScript, and Vite, offering a fast and responsive user experience. The backend is powered by Spring Boot (Java) and connects to a cloud-hosted Aiven PostgreSQL database. The backend is containerized with Docker and can be deployed directly from GitHub to Render.

---

## Live Demo

🌐 Visit the website: [Trackifi](https://trackifii.vercel.app)

The PWA version can be installed on both desktop and mobile by clicking "Install Trackifi".

---

## Features

- Transaction Management: Easily add, edit, and delete income or expense records.
- Visual Analytics: Interactive bar and pie charts show monthly and category-wise spending.
- Dashboard Overview: At-a-glance view of total spent, active budgets and active categories.
- Budget Tracking: Set monthly budgets per category and compare actual vs planned spending.
- Smart Alerts: Get notified via email when spending exceeds set limits.
---

## Prerequisites

- Java 21+ – for running the Spring Boot backend
- Maven – to build the Java project
- Node.js v18+ – for running the React + Vite frontend
- PostgreSQL – Aiven PostgreSQL account
- Docker & Docker Compose – to run the full stack easily (recommended)

---

## Installation & Running

### 1. Environment Setup
Create a .env file in the root directory based on .env.example with your Aiven DB credentials and JWT secret.

### 2. Run with Docker (Recommended)
From the root directory:
```bash
docker-compose up --build
```
The frontend will be at http://localhost:5173 and backend at http://localhost:8080.

### 3. Manual Run

#### Backend
```bash
cd backend
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

- Frontend: Vercel
- Backend: Render (Direct from GitHub using Dockerfile)
- Database: Aiven PostgreSQL
- Live Site: [Trackifi](https://trackifii.vercel.app)

Included in .github/workflows/ping.yml is a keep-alive action that pings the Render URL every 2 minutes to prevent the free tier from sleeping.

## Contributing:

1. Fork the repository
2. Clone the repository:
   
```
git clone https://github.com/ruthvik-mt/Trackifi.git
```
```
cd Trackifi
```
```
git remote add origin https://github.com/ruthvik-mt/Trackifi.git
```
3. Now, if you run git remote -v you should see origin pointing to your new repository.

## License

This project is licensed under the MIT License - see the LICENSE file for more details.

##

<div align="center">
  <strong>Made with ❤️ using Springboot</strong>
</div>
