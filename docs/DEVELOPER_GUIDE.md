# OutdoorLife Developer Guide

Everything you need to understand, run, change, and deploy OutdoorLife: architecture, data model, every API endpoint, security, configuration, deployment, customization recipes, testing, and troubleshooting.

| | |
|---|---|
| **Live store** | https://outdoorlife-demo.vercel.app |
| **Live API** | https://outdoorlife-api.onrender.com |
| **Source** | https://github.com/anuhya0305/OutdoorLife |

---

## 1. The big picture

OutdoorLife is an online store for outdoor gear. It has three parts, and it helps to think of them as a restaurant:

- **The dining room: the React frontend.** What customers see and click. Built with React and Vite, hosted on **Vercel**.
- **The kitchen: the Spring Boot backend.** Receives requests ("show me products", "place this order"), checks the rules (is this person logged in? is there enough stock?), and does the work. Java 17 + Spring Boot, hosted on **Render**.
- **The storeroom: the PostgreSQL database.** Where products, users, orders, and messages are kept. Hosted on **Neon**.

The dining room never touches the storeroom directly. Every request goes through the kitchen, which is where the rules are enforced.

```
 Browser                        Vercel                  Render                      Neon
┌─────────┐   loads app    ┌──────────────┐        ┌──────────────────┐        ┌────────────┐
│  User   │ ─────────────► │ React SPA    │        │ Spring Boot API  │  SQL   │ PostgreSQL │
│         │                │ (static JS)  │        │ (Docker, Java 17)│ ─────► │            │
│         │ ◄───────────── └──────────────┘        │                  │ ◄───── │            │
│         │     JSON over HTTPS (axios)            │ Spring Security  │        └────────────┘
│         │ ─────────────────────────────────────► │ JWT + BCrypt     │
│         │ ◄───────────────────────────────────── │                  │
└─────────┘                                        └──────────────────┘
```

### Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router 7, Redux Toolkit, Axios, Tailwind CSS 4, React Toastify, React Icons, Framer Motion, Swiper |
| Backend | Java 17, Spring Boot 3.4, Spring Web, Spring Data JPA (Hibernate 6.6), Spring Security (OAuth2 resource server, JWT), BCrypt |
| Database | PostgreSQL 17 (Neon serverless, pooled via PgBouncer) |
| Testing | JUnit 5, Mockito, MockMvc, ESLint |
| Hosting | Vercel (frontend), Render (backend, Docker), Neon (database) |

---

## 2. Repository layout

```
OutdoorLife/
├── backend/                         Spring Boot API
│   ├── Dockerfile                   Multi-stage build; JVM tuned for Render's free tier
│   ├── pom.xml                      Maven dependencies
│   └── src/
│       ├── main/java/com/outdoorlife/api/
│       │   ├── OutdoorLifeApplication.java   Entry point + seeds products on first start
│       │   ├── SecurityConfig.java           Who can call what; JWT encode/decode
│       │   ├── StoreController.java          Public + customer endpoints
│       │   ├── AuthController.java           Register / login (returns user JWT)
│       │   ├── AdminController.java          Admin login, product CRUD, orders, stats
│       │   ├── Product.java, Review.java, AppUser.java, CustomerOrder.java,
│       │   │   ContactMessage.java, Subscriber.java          JPA entities (tables)
│       │   └── *Repository.java              Spring Data JPA repositories
│       ├── main/resources/
│       │   ├── application.properties       Server + JPA + datasource settings
│       │   ├── products.json                 Seed catalog (loaded when the table is empty)
│       │   └── schema.sql                    Column upgrades Hibernate won't do on its own
│       └── test/java/com/outdoorlife/api/
│           ├── AuthControllerTest.java       Unit test: hashing + login
│           └── AdminSecurityTest.java        MockMvc: security rules, orders, stock
├── src/                             React frontend
│   ├── main.jsx                     App bootstrap: Router, Redux Provider, ToastContainer
│   ├── App.jsx                      Renders AppRoutes
│   ├── routes/                      AppRoutes (all pages), ProtectedAdminRoute
│   ├── pages/                       One folder per page (Home, Shop, Product, Cart, Checkout,
│   │                                Payment, Orders, Profile, Auth, Contact, Help, Admin/...)
│   ├── components/
│   │   ├── Home/                    Hero, Categories, ProductCard, Deals, Newsletter, ...
│   │   ├── Shop/                    SearchBar, CategoryFilter, SortDropdown
│   │   ├── layout/                  Navbar, Footer, MainLayout
│   │   ├── Admin/                   Sidebar, Header
│   │   └── Auth/ProtectedRoute.jsx  Redirects to /login without a valid user token
│   ├── services/                    All HTTP calls (one file per area)
│   ├── redux/                       Cart + wishlist state (persisted to localStorage)
│   └── utils/session.js             JWT expiry check used by the route guards
├── public/images/                   Product photos served as /images/...
├── docs/DEVELOPER_GUIDE.md          This file
├── vercel.json                      SPA rewrite so deep links (e.g. /shop/3) work
└── .vercelignore                    Keeps backend/ out of the frontend upload
```

---

## 3. How a request flows

**Example: a logged-in customer places an order.**

1. **Checkout page** (`pages/Checkout/Checkout.jsx`) validates the address, builds an order object from the Redux cart, saves it as `pendingOrder` in `localStorage`, and goes to `/payment`.
2. **Payment page** (`pages/Payment/Payment.jsx`) adds the payment method and status, then calls `placeOrder()` in `services/OrderService.jsx`.
3. `placeOrder()` sends `POST /orders` with the header `Authorization: Bearer <user token>`, reading the token from the `loggedInUser` session in `localStorage`.
4. On the server, **Spring Security** (`SecurityConfig`) checks the token's signature and expiry, and that it carries the `USER` scope. No valid token → `401`.
5. **`StoreController.placeOrder`** runs in one database transaction:
   - Totals the quantity requested per product.
   - Loads each product and checks stock. If any item is short, it returns `409` ("Premium Camping Tent has only 3 left in stock") **before** changing anything.
   - Reduces stock, sets `order.userId` **from the token** (never from the request body), and saves.
6. The response comes back; the page clears the cart and shows the success page.

Every other feature follows the same shape: **page → service (axios) → controller → repository → database**.

---

## 4. Data model

Hibernate creates and updates these tables from the entity classes (`spring.jpa.hibernate.ddl-auto=update`). Column names are snake_case versions of the Java fields.

| Table (entity) | Key fields | Notes |
|---|---|---|
| `product` (`Product`) | `id` (string), `name`, `description` (text), `category`, `price`, `old_price`, `rating`, `stock`, `featured`, `deal`, `best_seller`, `image` (text) | Seeded from `products.json` when empty. `image` is either a `/images/...` path or a base64 `data:` URL uploaded by the admin. |
| `review` (`Review`) | `id` (UUID), `product_id`, `name`, `rating` (1–5), `comment`, `date` | Public: anyone can post a review. |
| `users` (`AppUser`) | `id` (UUID), `name`, `email` (unique, lowercased), `password` | `password` is a BCrypt hash and is never returned by the API (`@JsonIgnore`). |
| `orders` (`CustomerOrder`) | `id` (UUID), `order_id` (e.g. `ORD-1790…`), `user_id`, `customer` (JSON), `items` (JSON), `total_amount`, `discount`, `coupon`, `order_date`, `payment_method`, `payment_status`, `order_status` | `customer` and `items` are JSON snapshots: the name and price at purchase time don't change when a product is edited later. |
| `contact_message` (`ContactMessage`) | `id`, `name`, `email`, `message`, `created_at` | From the Contact page; shown on the admin dashboard. |
| `subscriber` (`Subscriber`) | `id`, `email` (unique), `created_at` | From the newsletter box. Subscribing twice is harmless. |

Order statuses: `Processing` (default), `Shipped`, `Delivered`, `Cancelled`. Cancelled orders are excluded from revenue.

---

## 5. API reference

Base URL: `https://outdoorlife-api.onrender.com` (production) or `http://localhost:8080` (local).
All bodies are JSON. Errors look like `{"error": "human-readable message"}`.

**Auth column:** *Public* = no token. *User* = `Authorization: Bearer <token from /auth/login or /auth/register>`. *Admin* = `Authorization: Bearer <token from /admin/login>`.

### Catalog and reviews

| Method | Path | Auth | Description | Responses |
|---|---|---|---|---|
| GET | `/products` | Public | All products | 200 |
| GET | `/products/{id}` | Public | One product | 200, 404 |
| GET | `/reviews?productId={id}` | Public | Reviews for a product (all reviews without the parameter) | 200 |
| POST | `/reviews` | Public | Add a review: `{productId, name, rating, comment, date}` | 201, 400 |

### Accounts

| Method | Path | Auth | Description | Responses |
|---|---|---|---|---|
| POST | `/auth/register` | Public | `{name, email, password}` → creates the account and logs in | 201 session, 400, 409 email taken |
| POST | `/auth/login` | Public | `{email, password}` | 200 session, 401 |

A **session** looks like this. The frontend stores it as `loggedInUser`:

```json
{ "id": "6c04b1f0-…", "name": "Alice", "email": "alice@example.com", "token": "eyJhbGciOiJIUzI1NiJ9…" }
```

### Orders (customers)

| Method | Path | Auth | Description | Responses |
|---|---|---|---|---|
| POST | `/orders` | User | Place an order (see below) | 201, 400, 401, 409 out of stock |
| GET | `/orders` | User | Your own orders, oldest first | 200, 401 |

```json
{
  "orderId": "ORD-1790238276000",
  "customer": { "fullName": "Alice", "phone": "9000000000", "houseNo": "1-23", "street": "MG Road",
                "city": "Hyderabad", "state": "Telangana", "pincode": "500001" },
  "items": [ { "id": "1", "name": "Premium Camping Tent", "price": 5499, "quantity": 2 } ],
  "totalAmount": 10998, "discount": 0, "coupon": "",
  "orderDate": "2026-09-24T10:00:00Z",
  "paymentMethod": "UPI", "paymentStatus": "Paid", "orderStatus": "Processing"
}
```

Any `userId` in the body is ignored; the server uses the token's owner.

### Contact and newsletter

| Method | Path | Auth | Description | Responses |
|---|---|---|---|---|
| POST | `/contact` | Public | `{name, email, message}` (≤100 / 200 / 2000 chars) | 201, 400 |
| POST | `/newsletter` | Public | `{email}` | 200, 400 |

### Admin

| Method | Path | Auth | Description | Responses |
|---|---|---|---|---|
| POST | `/admin/login` | Public | `{email, password}` checked against server env vars | 200 `{token}`, 401 |
| POST | `/products` | Admin | Create a product (id generated if missing) | 201, 401, 403 |
| PUT | `/products/{id}` | Admin | Replace a product | 200, 404 |
| DELETE | `/products/{id}` | Admin | Delete a product | 204 |
| GET | `/admin/orders` | Admin | All orders | 200 |
| PUT | `/admin/orders/{id}/status` | Admin | `{orderStatus}`: one of Processing, Shipped, Delivered, Cancelled | 200, 400, 404 |
| GET | `/admin/stats` | Admin | Dashboard numbers (below) | 200 |
| GET | `/admin/messages` | Admin | Contact messages, newest first | 200 |

```json
{ "products": 33, "orders": 12, "customers": 8, "revenue": 84500.0, "subscribers": 5,
  "ordersByStatus": { "Delivered": 4, "Processing": 6, "Shipped": 2 },
  "recentOrders": [ /* last 5 orders, newest first */ ] }
```

**Status codes to know:** `401` = no token, or an invalid/expired one. `403` = a valid token without the right scope (e.g. a customer token on an admin endpoint). `409` = conflict (email already registered, or not enough stock).

### Try it with curl

```bash
# Browse
curl https://outdoorlife-api.onrender.com/products

# Register, keep the token, list your orders
TOKEN=$(curl -s -X POST localhost:8080/auth/register -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","password":"change-me"}' | jq -r .token)
curl localhost:8080/orders -H "Authorization: Bearer $TOKEN"
```

---

## 6. Security model

| Concern | How it's handled | Where |
|---|---|---|
| Passwords | Hashed with **BCrypt** before saving; login uses `encoder.matches()`. Hashes are never returned (`@JsonIgnore`). | `AuthController`, `AppUser` |
| Customer identity | Login/register return a **JWT** signed with HMAC-SHA256 (`JWT_SECRET`), scope `USER`, subject = user id, valid **24 hours**. | `AuthController`, `SecurityConfig.issueToken` |
| Admin identity | Credentials live only in server env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD`), compared in constant time. Success returns a JWT with scope `ADMIN`, valid **8 hours**. | `AdminController.login` |
| Access rules | Spring Security (OAuth2 resource server) validates every bearer token. `/admin/**` (except `/admin/login`), product writes → `ADMIN`. `/orders` → `USER`. Everything else is public. | `SecurityConfig.filterChain` |
| Order ownership | The server takes the user id from the token, never from the request body. | `StoreController` |
| SQL injection | No hand-written SQL: Spring Data JPA uses parameterized queries. | repositories |
| CSRF | Disabled on purpose: the API is stateless and authenticates with an `Authorization` header, which browsers never attach automatically. **Turn it back on if you ever move auth into cookies.** | `SecurityConfig` |
| CORS | Open (`@CrossOrigin`), which is safe because nothing relies on cookies. Restrict origins if that changes. | controllers |
| Secrets | Never committed. DB credentials, admin password, and JWT secret are environment variables. | Render dashboard |

**Frontend guards are convenience, not security.** `ProtectedRoute` and `ProtectedAdminRoute` only check that a token exists and hasn't expired, to avoid pointless requests. The real enforcement is on the server; editing `localStorage` in the browser gets you nothing.

---

## 7. Frontend guide

### Routes (`src/routes/AppRoutes.jsx`)

| Path | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/shop` | Shop (supports `?category=Camping`) | Public |
| `/shop/:id` | Product details + reviews | Public |
| `/contact`, `/help` | Contact form; FAQs / Returns / Privacy | Public |
| `/login`, `/register` | Customer and admin login; sign-up | Public |
| `/cart`, `/wishlist`, `/checkout`, `/payment`, `/order-success`, `/orders`, `/profile` | Shopping and account pages | Logged-in customer |
| `/admin/dashboard`, `/admin/products`, `/admin/add-product`, `/admin/edit-product/:id`, `/admin/orders` | Admin panel | Admin |
| `*` | Not found | Public |

### Services (`src/services/`)

All HTTP calls live here, so pages never build URLs themselves. Every file reads the base URL from `VITE_API_URL`.

| File | Calls |
|---|---|
| `ProductService.js` | products, reviews, admin product create/update/delete |
| `AuthService.js` | register, login, admin login |
| `OrderService.jsx` | place order, my orders (sends the user token) |
| `AdminService.js` | stats, all orders, update status, messages (sends the admin token) |
| `ContactService.js` | contact message, newsletter |

### Browser storage keys

| Key | Holds | Set by |
|---|---|---|
| `loggedInUser` | Session `{id, name, email, token}` | Login, Register |
| `adminToken` | Admin JWT | Admin login |
| `cart`, `wishlist` | Redux state, so items survive a refresh | `redux/store.js` |
| `pendingOrder` | Order being paid for | Checkout |
| `lastOrder` | Order shown on the success page | Payment |

### State

The cart and wishlist are Redux slices (`redux/cartSlice.js`, `redux/wishlistSlice.js`). `store.js` loads them from `localStorage` on startup and saves them on every change. Everything else is component state plus API calls.

---

## 8. Local development

### Prerequisites

- JDK 17 and Maven 3.9+
- Node.js 20.19+ (or 22.12+) and npm
- A PostgreSQL database. Either run one locally, or create a free instant one with `npx get-db@latest` (Neon). An unclaimed instant database is deleted after 72 hours unless you claim it.

### 1. Start the backend

```bash
cd backend
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/outdoorlife"
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=your-db-password
export ADMIN_PASSWORD=choose-an-admin-password
export JWT_SECRET=any-random-string-at-least-32-characters-long
mvn spring-boot:run
```

It starts on http://localhost:8080. On the first run, Hibernate creates the tables and the app loads 33 products from `products.json`. On Windows PowerShell, use `$env:NAME = "value"` instead of `export`.

For a Neon connection string `postgresql://user:pass@host/db?sslmode=require`, the JDBC URL is `jdbc:postgresql://host/db?sslmode=require`, and the user and password go in their own variables.

### 2. Start the frontend

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Without `VITE_API_URL`, it talks to `http://localhost:8080`.

### 3. Log in as admin

Go to `/login`, choose **Admin**, and use `admin@outdoorlife.com` (or your `ADMIN_EMAIL`) with your `ADMIN_PASSWORD`.

---

## 9. Configuration reference

### Backend (environment variables)

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SPRING_DATASOURCE_URL` | yes | – | JDBC URL, e.g. `jdbc:postgresql://host/db?sslmode=require` |
| `SPRING_DATASOURCE_USERNAME` | yes | – | Database user |
| `SPRING_DATASOURCE_PASSWORD` | yes | – | Database password |
| `ADMIN_PASSWORD` | yes | – | Admin panel password |
| `ADMIN_EMAIL` | no | `admin@outdoorlife.com` | Admin login email |
| `JWT_SECRET` | yes | – | Signing key for all tokens; at least 32 characters. Changing it logs everyone out. |
| `PORT` | no | `8080` | Set automatically by Render |

`application.properties` also sets:
- `ddl-auto=update`: Hibernate keeps tables in sync with the entities.
- `defer-datasource-initialization` + `sql.init.mode=always`: `schema.sql` runs after Hibernate on every start.
- `prepareThreshold=0`: required behind Neon's PgBouncer (see Troubleshooting).

### Frontend

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080` | Backend base URL. **Baked in at build time**, so rebuild after changing it. |

---

## 10. Deployment

The current production setup: frontend on **Vercel**, backend on **Render**, database on **Neon**.

### Backend on Render

- Service type: **Web Service**, runtime **Docker**, root directory `backend`, health check path `/products`.
- Set the environment variables from section 9 in the Render dashboard, under the service's **Environment** tab.
- Deploy from the dashboard (**Manual Deploy**) or with the Render CLI: `render deploys create <service-id>`. The repo is connected by its public URL, so pushes don't auto-deploy.
- The `Dockerfile` builds with Maven, then runs on a slim JRE with flags tuned for a tiny CPU share (`-XX:TieredStopAtLevel=1 -XX:+UseSerialGC`). That cut startup from about 100s to about 50s.
- **Free tier behavior:** the service sleeps after 15 minutes idle. The first request afterwards wakes it, which takes about a minute, and pages look empty until it's up.

> **Windows + Git Bash gotcha:** Git Bash rewrites arguments that start with `/` when passing them to `.exe` programs. `render services update … --health-check-path /products` silently became `C:/Program Files/Git/products`, and deploys hung. Prefix such commands with `MSYS_NO_PATHCONV=1`.

### Frontend on Vercel

- Framework preset: Vite. Build command `npm run build`, output directory `dist`.
- Set `VITE_API_URL` to the Render URL in the project's environment variables (Production).
- Deploy with `vercel --prod` from the repo root. `.vercelignore` keeps `backend/` out of the upload.
- `vercel.json` rewrites every path to `index.html`, so refreshing a deep link like `/shop/3` works instead of returning 404.

### Database on Neon

- Use the connection string from the Neon dashboard. The pooled host (with `-pooler`) goes through PgBouncer; `prepareThreshold=0` in `application.properties` makes that safe.
- An instant database created without an account (neon.new / `npx get-db`) is deleted after 72 hours unless it's **claimed** into a Neon account. Claiming keeps the same connection string, so nothing needs redeploying.

### Release checklist

1. `cd backend && mvn test` passes.
2. `npm run lint` and `npm run build` pass.
3. Deploy the **backend first** when an API change is involved, and wait until it's live.
4. Then deploy the frontend.
5. Smoke test: open the store, browse a category, add to cart, log in, and check the admin dashboard.

---

## 11. Customization recipes

### Add, edit, or remove products
- **Day to day:** use the admin panel (**Products → Add / Edit / Delete**). Uploaded images are stored in the database (1 MB limit).
- **Change the starting catalog:** edit `backend/src/main/resources/products.json`. It's only loaded when the `product` table is empty, so on an existing database, use the admin panel or clear the table.
- **Static images:** put files in `public/images/` and reference them as `/images/name.jpg`.

### Change store name, colors, and text
- Name and logo: `components/layout/Navbar.jsx` (the 🏕️ emoji and "OutdoorLife"), `components/layout/Footer.jsx`, and `components/Admin/Sidebar.jsx`.
- Colors: Tailwind classes such as `bg-green-700`, `text-green-700`, and `bg-orange-500`. Search and replace them across `src/` to rebrand.
- Hero text and image: `components/Home/Hero.jsx`. Tab title: `index.html`.

### Add a homepage category
Add an entry to the `categories` array in `components/Home/Categories.jsx` (name + icon from `react-icons/fa`). The `name` must exactly match products' `category` value, because the card links to `/shop?category=<name>`.

### Change discount codes
Coupons are applied in `pages/Checkout/Checkout.jsx` (`applyCoupon`: `SAVE10` = 10%, `WELCOME20` = 20%). Keep the banner in `components/Home/OfferBanner.jsx` and the FAQ in `pages/Help/Help.jsx` in sync. Totals are currently trusted from the client (see Known limitations), so move coupon logic server-side before taking real payments.

### Add an order status
1. Backend: add it to `ORDER_STATUSES` in `AdminController`.
2. Frontend: add it to `STATUSES` in `pages/Admin/Orders.jsx` and `STATUS_STYLE` in `pages/Admin/Dashboard.jsx`.

### Add a new API endpoint (end to end)
1. **Entity** (if you need a new table): a class with `@Entity` and an `@Id`. Hibernate creates the table on the next start.
2. **Repository:** `interface ThingRepository extends JpaRepository<Thing, String> {}`. Method names like `findByEmail` become queries automatically.
3. **Controller:** add a method with `@GetMapping`/`@PostMapping`, validate input at the top, and return `ResponseEntity`.
4. **Security:** if it isn't public, add a matcher in `SecurityConfig.filterChain` (`hasAuthority(USER)` or `hasAuthority(ADMIN)`) before `anyRequest().permitAll()`. To act as the caller, take `@AuthenticationPrincipal Jwt user` and use `user.getSubject()`.
5. **Test:** extend `AdminSecurityTest` with MockMvc calls for the allowed and denied cases.
6. **Frontend:** add a function in the right `services/` file, then call it from the page.

### Add a new page
Create `src/pages/Thing/Thing.jsx`, register it in `routes/AppRoutes.jsx` (inside the `MainLayout` route to get the navbar and footer), wrap it in `<ProtectedRoute>` if it needs login, and link to it from the Navbar or Footer.

### Change admin credentials or log everyone out
Update `ADMIN_EMAIL` / `ADMIN_PASSWORD` in the Render environment and redeploy. To invalidate every existing token (customers and admin), change `JWT_SECRET`.

### Change token lifetimes or the image size limit
- Tokens: the last argument to `SecurityConfig.issueToken(...)`: 24 hours in `AuthController`, 8 hours in `AdminController`.
- Images: `MAX_IMAGE_BYTES` in `pages/Admin/AddProduct.jsx`.

### Change a column type later
`ddl-auto=update` adds new tables and columns, but never changes an existing column's type. Add an idempotent `ALTER TABLE …` to `schema.sql` (it runs after Hibernate on every start). If migrations grow, switch to Flyway.

---

## 12. Testing

| Check | Command | What it proves |
|---|---|---|
| Backend unit + web tests | `cd backend && mvn test` | `AuthControllerTest`: passwords are stored as BCrypt hashes, login accepts the right password, rejects the wrong one, and returns a token. `AdminSecurityTest`: admin endpoints reject missing, wrong, and customer tokens; orders are saved to the token owner, not a `userId` in the body; stock is reduced, and an over-stock order returns 409 without changing stock. |
| Frontend lint | `npm run lint` | No undefined variables, hooks mistakes, or dead code (currently zero problems). |
| Frontend build | `npm run build` | The production bundle compiles. |

**Manual QA checklist before a release:** homepage categories open the filtered Shop; Add to cart from a card and from product details; the cart survives a refresh; register → navbar shows your name immediately → checkout → payment → My Orders; a Contact message appears on the admin dashboard; the admin changes an order status and the customer sees it; the admin adds a product with an image and it shows for other visitors.

---

## 13. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Home page sections and Shop are empty for about a minute | Render free tier woke from sleep | Wait; or upgrade the Render plan to keep it always on |
| `ERROR: cached plan must not change result type` | PgBouncer reused a prepared statement compiled before a column type change | Keep `spring.datasource.hikari.data-source-properties.prepareThreshold=0` |
| Logged in, but cart/orders redirect to `/login` | The token expired (24h) or predates the token-based login | Log in again |
| Admin pages bounce to `/login` | The admin token expired (8h) | Log in as admin again |
| `401` on `/orders` or admin endpoints | Missing or expired `Authorization: Bearer` header | Check the service file sends the token |
| `403` on an admin endpoint | Customer token used where the admin one is needed | Use the admin token |
| Build fails on Vercel/Linux but works on Windows | Import path casing (`Newsletter` vs `NewsLetter.jsx`); Windows ignores case, Linux doesn't | Match the file name exactly |
| Refreshing `/shop/3` shows a Vercel 404 | Missing SPA rewrite | Keep `vercel.json` |
| Frontend calls `localhost` in production | `VITE_API_URL` not set at build time | Set it in Vercel and redeploy |
| Deploy hangs on Render's health check | Wrong health check path | Must be `/products`; beware the Git Bash path rewrite above |
| App can't start: `Could not resolve placeholder 'JWT_SECRET'` | A required env var is missing | Set `JWT_SECRET` and `ADMIN_PASSWORD` |

---

## 14. Design decisions

- **Spring Data JPA over hand-written JDBC:** less boilerplate, and parameterized queries by default. (Compare ClientManagementSystem, which uses JDBC + DAO.)
- **Stateless JWT over server sessions:** the API can restart or scale without losing logins, and one mechanism covers customers and the admin.
- **One HMAC key (HS256):** a single service both issues and verifies tokens, so asymmetric keys add nothing yet.
- **Orders store JSON snapshots** of the address and items: an order is a record of what was bought at that price, even if the product changes later.
- **Images in the database as data URLs:** zero extra infrastructure for a small catalog. Move to object storage (S3, Cloudinary) if uploads grow.
- **`schema.sql` instead of Flyway:** one idempotent column upgrade didn't justify a migration framework yet.
- **Free-tier hosting** (Render + Neon + Vercel): costs nothing, and the only trade-off is cold starts.

---

## 15. Known limitations and roadmap

| Limitation | Why it matters | Next step |
|---|---|---|
| Order totals and coupons are computed in the browser | A crafted request could send any total | Recalculate prices, discounts, and totals on the server |
| Payment is simulated | No real money moves | Integrate a gateway (e.g. Razorpay) with server-side verification |
| Two simultaneous orders can oversell the last units | Stock check and update aren't locked | Add `@Version` optimistic locking to `Product` |
| No rate limiting on login, contact, or newsletter | Brute force and spam are possible | Add a rate limiter (e.g. Bucket4j) |
| Single admin account from env vars | No roles or audit trail | An `admins` table with roles |
| No password reset or email verification | Users can't recover accounts | Email-based reset tokens |
| Images stored in the database | The products response grows with each upload | Object storage + URLs |
| No refresh tokens | Users log in again after 24h | Refresh-token rotation |
| Free-tier cold starts | About a minute of empty pages after idle | Paid always-on instance |

---

## 16. Glossary

| Term | Meaning |
|---|---|
| **SPA** | Single-page application: the browser loads one HTML page and React swaps views without full reloads. |
| **REST API** | The backend's set of URLs (endpoints) that accept and return JSON. |
| **JWT** | JSON Web Token: a signed, tamper-proof pass that says who you are and what you may do, until it expires. |
| **BCrypt** | A deliberately slow, salted, one-way hashing function for passwords. |
| **JPA / Hibernate** | Java's standard for mapping classes to database tables; Hibernate is the implementation. |
| **Repository** | A Spring Data interface that provides database queries without writing SQL. |
| **CORS** | Browser rules about which websites may call an API from JavaScript. |
| **CSRF** | An attack that tricks a browser into sending authenticated requests using its cookies. |
| **PgBouncer** | A connection pooler in front of PostgreSQL, used by Neon. |
| **Cold start** | The delay while a sleeping free-tier server boots on the first request. |
