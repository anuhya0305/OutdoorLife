# OutdoorLife

A React e-commerce storefront for outdoor gear — browsing, product details with reviews, cart, wishlist, checkout, and order history — built with Vite and a local `json-server` mock API.

## Features

- Home page with categories, featured products, deals, best sellers, and testimonials
- Shop page with search, category filter, and sorting
- Product details with reviews
- Cart and wishlist (Redux Toolkit state)
- Multi-step checkout: cart → checkout → payment → order confirmation
- Order history
- Auth (login/register) with a protected-route wrapper
- User profile and contact pages

## Tech Stack

- React 19 + Vite
- Redux Toolkit / React Redux (cart, wishlist state)
- React Router v7
- React Hook Form (form validation)
- Axios (HTTP client)
- Tailwind CSS
- Framer Motion, Swiper, React Icons, React Toastify
- `json-server` as a local mock REST API (`db.json`)

## Project Structure

```
src/
 ├── assets/
 ├── components/
 │   ├── Home/         # Hero, Categories, FeaturedProducts, Deals, BestSellers, Testimonials, ...
 │   ├── Shop/          # CategoryFilter, SearchBar, SortDropdown
 │   ├── Auth/           # ProtectedRoute
 │   ├── layout/          # Navbar, Footer, MainLayout
 │   └── common/           # Button, Input, Loader, EmptyState
 ├── pages/
 │   ├── Home, Shop, Product, Cart, Checkout, Payment,
 │   │   Orders, OrderSuccess, Wishlist, Profile, Contact, Auth, NotFound
 ├── redux/             # store.js, cartSlice.js, wishlistSlice.js
 ├── routes/             # AppRoutes.jsx
 ├── services/           # AuthService, ProductService, OrderService (axios calls to json-server)
 └── main.jsx / App.jsx
db.json                 # mock data: products, users, wishlist, cart, orders, reviews
```

## Running Locally

This app needs two processes running at once: the mock API and the Vite dev server.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the mock API (serves `db.json` on port 3000):
   ```bash
   npm run server
   ```
3. In a second terminal, start the dev server:
   ```bash
   npm run dev
   ```
4. Open the URL Vite prints (typically `http://localhost:5173`).

## Known Limitation

Auth currently talks to `json-server`, which has no real authentication, hashing, or session handling — it's a local file-backed mock meant for frontend development, not a production backend. `db.json` also ships with the repo, so **nothing sensitive should ever be committed into it** (the seed data here is placeholder/demo data only). To make this production-ready, the next step would be swapping the `services/*.js` calls for a real backend API with proper password hashing and session/token-based auth.

## Build

```bash
npm run build
```
