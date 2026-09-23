# OutdoorLife

A full-stack e-commerce store for outdoor gear: a React storefront backed by a Spring Boot REST API and PostgreSQL.

## Features

- Home page with categories, featured products, deals, best sellers, and testimonials
- Shop page with search, category filter, and sorting
- Product details with customer reviews (stored in the database)
- Cart and wishlist (Redux Toolkit state)
- Checkout → payment → order confirmation, with orders persisted per user
- Registration and login, with passwords hashed using BCrypt
- Admin panel (add, edit, delete products; view all orders) secured with Spring Security + JWT

## Tech Stack

**Backend** (`backend/`)
- Java 17, Spring Boot 3.4
- Spring Data JPA + Hibernate, PostgreSQL
- Spring Security (OAuth2 resource server, JWT) and BCrypt password hashing
- JUnit 5 + Mockito
- Docker

**Frontend**
- React 19 + Vite, Redux Toolkit, React Router v7
- React Hook Form, Axios, Tailwind CSS, Framer Motion, Swiper

## API

| Method | Path | Description |
|--------|------|-------------|
| GET  | `/products` | All products |
| GET  | `/reviews?productId={id}` | Reviews for a product |
| POST | `/reviews` | Add a review (validated: name, comment, 1–5 rating) |
| POST | `/auth/register` | Create an account (409 if the email exists) |
| POST | `/auth/login` | Log in (401 on bad credentials) |
| POST | `/orders` | Place an order |
| GET  | `/orders?userId={id}` | A user's own orders |
| POST | `/admin/login` | Admin login, returns a JWT (8h) |
| POST | `/products` | Add a product · **admin** |
| PUT  | `/products/{id}` | Update a product · **admin** |
| DELETE | `/products/{id}` | Delete a product · **admin** |
| GET  | `/admin/orders` | All orders · **admin** |

Admin endpoints are protected with Spring Security as an OAuth2 resource server: requests need an `Authorization: Bearer <token>` header with a valid HS256-signed JWT carrying the `ADMIN` scope. Admin credentials live in server environment variables, never in the frontend. Passwords are never returned by the API. Products are seeded from `backend/src/main/resources/products.json` on first start.

## Running Locally

**Backend** — needs a PostgreSQL database:

```bash
cd backend
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/outdoorlife
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=your-password
export ADMIN_EMAIL=admin@outdoorlife.com
export ADMIN_PASSWORD=choose-a-strong-password
export JWT_SECRET=any-random-string-of-at-least-32-characters
mvn spring-boot:run
```

Runs on `http://localhost:8080`. Tables are created automatically.

**Frontend** — in a second terminal:

```bash
npm install
npm run dev
```

The frontend calls `http://localhost:8080` by default; set `VITE_API_URL` to point it at a deployed backend.

**Tests:**

```bash
cd backend
mvn test
```

## Deployment

- Frontend: Vercel (`vercel.json` rewrites all routes to `index.html` for client-side routing)
- Backend: Render, built from `backend/Dockerfile`
- Database: Neon PostgreSQL
