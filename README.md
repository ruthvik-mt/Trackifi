# Trackifi 

A full-stack Personal Finance Visualizer web app to help users track expenses and manage spending with visual insights.

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

**Trackifi** is a personal finance web app that empowers users to manage income, track expenses, set budgets, and gain financial insights through intuitive visualizations.

The **frontend** is built using **React**, **TypeScript**, and **Vite**, offering a fast and responsive user experience. The **backend** is powered by **Spring Boot (Java)** and connects to a cloud-hosted **Neon PostgreSQL** database. The backend is **containerized with Docker** and published on **Docker Hub**.

The project is developed in three progressive stages:
1. **Basic Transaction Tracking**
2. **Categorized Analytics**
3. **Monthly Budgeting & Insights**

Each stage introduces new features, charts, and intelligent feedback to help users make smarter financial decisions.


---

## Live Demo

🌐 Visit the website: [Trackifi](https://trackifii.vercel.app)  

---

## Features

- **Transaction Management**: Easily add, edit, and delete income or expense records.
- **Visual Analytics**: Interactive bar and pie charts show monthly and category-wise spending.
- **Dashboard Overview**: At-a-glance view of total spent, active budgets and active categories.
- **Budget Tracking**: Set monthly budgets per category and compare actual vs planned spending.
- **Smart Alerts**: Get notified via email when spending exceeds set limits.
---

## Prerequisites

- **Java 17+** – for running the Spring Boot backend
- **Maven** – to build the Java project
- **Neon PostgreSQL account** – for the cloud database (or local PostgreSQL setup)
- **Docker** – to build and run the backend container (optional but recommended)
- **Node.js v18+** – for running the React + Vite frontend
---

## Installation

### 🖥️ Frontend (Next.js + Vite + shadcn/ui)

```bash
git clone https://github.com/your-username/trackifi.git
cd trackifi/frontend
npm install
