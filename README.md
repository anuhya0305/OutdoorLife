# OutdoorLife

A full-stack e-commerce store for outdoor gear: a React storefront backed by a Spring Boot REST API and PostgreSQL.

**Live demo:** https://outdoorlife-demo.vercel.app · **API:** https://outdoorlife-api.onrender.com

> The backend runs on a free tier that sleeps when idle; the first visit after a quiet spell takes about a minute to wake it.

📘 **[Developer Guide](docs/DEVELOPER_GUIDE.md)**: architecture, data model, full API reference, security model, configuration, deployment, customization recipes, testing, and troubleshooting.

## Features

- Shop with categories, search, sorting, product details, and customer reviews
- Cart and wishlist that survive page refreshes
- Checkout with coupon codes (`WELCOME20`, `SAVE10`), a simulated payment step, and per-user order history
- Stock checked and reduced on every order
- Accounts with BCrypt-hashed passwords and JWT login
- Contact form and newsletter sign-up
- Admin panel: live dashboard stats, product management with image upload, order status updates, and contact messages, secured with Spring Security + JWT

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router 7, Redux Toolkit, Axios, Tailwind CSS 4 |
| Backend | Java 17, Spring Boot 3.4, Spring Data JPA (Hibernate), Spring Security (JWT), BCrypt |
| Database | PostgreSQL (Neon) |
| Testing | JUnit 5, Mockito, MockMvc, ESLint |
| Hosting | Vercel (frontend), Render with Docker (backend), Neon (database) |

## Quick Start

```bash
# Backend (needs a PostgreSQL database)
cd backend
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/outdoorlife
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=your-db-password
export ADMIN_PASSWORD=choose-an-admin-password
export JWT_SECRET=any-random-string-at-least-32-characters-long
mvn spring-boot:run

# Frontend (second terminal, repo root)
npm install
npm run dev
```

Tests: `cd backend && mvn test` · Lint: `npm run lint`

See the [Developer Guide](docs/DEVELOPER_GUIDE.md) for everything else.
