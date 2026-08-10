<div align="center">

# 🛒 TradeHub — B2B Retail Ordering & Operations Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*A full-stack modern retail commerce and distributor ordering management system built with the MERN stack.*

[Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Deployment Guide](#-deployment-guide) • [Demo Credentials](#-demo-credentials)

---

</div>

## 📖 Overview

**TradeHub** is an end-to-end B2B commerce solution designed for retailers, distributors, and FMCG brands. It bridges the gap between store owners and suppliers with a clean, fast shopping experience, integrated promotional schemes, persistent cart, real-time order tracking, and an admin management dashboard with business analytics.

---

## ✨ Key Features

### 🛍️ Retailer Portal
- **Catalogue & Search**: Browse FMCG products with instant search, category filtering (Home Care, Personal Care, Hair Care, Foods, Nutrition, Skin Care, Oral Care), and stock availability.
- **Dynamic Cart & Checkout**: Persistent cart powered by Zustand and `localStorage`. Adjust quantities, view order summary with live tax & total calculations.
- **Promotional Schemes**: Discover active manufacturer deals (e.g. *Buy 6 Get 1 Free*, cashbacks, and bulk order discounts) that automatically calculate eligible thresholds.
- **Order History & Tracking**: Real-time status tracking (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`) with itemized receipts.

### 📊 Admin Operations & Management
- **Analytics Dashboard**: Real-time KPI cards (Total Revenue, Orders, Products, Active Schemes) and graphical revenue trends powered by Recharts.
- **Catalogue Management**: Add, edit, deactivate, or delete products with custom pricing, packaging unit sizes, and image URLs.
- **Order Fulfilment**: View all retailer orders, filter by state, update delivery statuses, and view retailer details.
- **Promotional Schemes Manager**: Launch and manage time-limited promotional campaigns with custom validity periods and minimum order conditions.
- **User Directory**: View registered retailers and administrators.

### 🛡️ Security & Architecture
- **Role-Based Access Control (RBAC)**: Protected routes for `admin` and `retailer` roles.
- **JWT Authentication**: Secure token generation with Axios request and response interceptors.
- **Modular Codebase**: Clean separation between RESTful backend services and a reactive component-driven frontend.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query) + [Axios](https://axios-http.com/)
- **Charts & Visuals**: [Recharts](https://recharts.org/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Security**: [JSON Web Tokens (JWT)](https://jwt.io/), [BcryptJS](https://github.com/dcodeIO/bcrypt.js), [CORS](https://github.com/expressjs/cors)
- **Logging**: [Morgan](https://github.com/expressjs/morgan)

---

## 📁 Repository Structure

```text
Traderhub/
├── assets/                    # Product imagery and branding assets
├── backend/                   # Node.js & Express REST API
│   ├── config/                # Database connection & seed script
│   ├── middleware/            # Auth middleware (JWT verification & admin checks)
│   ├── models/                # Mongoose schema models (User, Product, Order, Scheme)
│   ├── routes/                # Express API endpoints
│   │   ├── admin.js           # Admin metrics & analytics
│   │   ├── auth.js            # Authentication routes
│   │   ├── orders.js          # Order placement & fulfillment
│   │   ├── products.js        # Product catalog CRUD
│   │   └── schemes.js         # Promotional schemes CRUD
│   ├── .env.example           # Backend environment template
│   ├── package.json
│   └── server.js              # Express application entry
├── frontend/                  # React + Vite client application
│   ├── src/
│   │   ├── components/        # Reusable UI components & layouts (Navbar, Sidebar, etc.)
│   │   ├── pages/             # Retailer & Admin page views
│   │   ├── api.js             # Centralized Axios client & API methods
│   │   ├── store.js           # Zustand stores for auth and persistent cart
│   │   ├── App.jsx            # Routing and role guards
│   │   └── main.jsx           # App bootstrapping
│   ├── .env.example           # Frontend environment template
│   ├── package.json
│   ├── vercel.json            # SPA routing rewrite rule for Vercel
│   └── vite.config.js         # Vite configuration with chunk splitting & proxy
└── package.json               # Root scripts
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Thamizhselvankumar/Traderhub.git
cd Traderhub
```

---

### 2. Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `backend/` directory:
```bash
cp backend/.env.example backend/.env
```
Populate `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tradehub?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

#### Frontend Configuration (Optional for local dev)
Create a `.env` file in the `frontend/` directory if connecting to a custom backend URL:
```bash
cp frontend/.env.example frontend/.env
```
*(In local development, Vite proxies `/api` requests to `http://localhost:5000` automatically).*

---

### 3. Install Dependencies & Seed Data

```bash
# Install both backend & frontend dependencies
npm run install:all

# Seed database with initial products, promotional schemes, and demo accounts
npm run seed
```

---

### 4. Run Locally

Run the development servers:

```bash
# Start backend and frontend concurrently
npm run dev
```

Or run them individually in separate terminals:

```bash
# Terminal 1: Start Backend API (runs on port 5000)
cd backend
npm run dev

# Terminal 2: Start Frontend Client (runs on port 5173)
cd frontend
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@demo.com` | `admin123` | Full dashboard, product catalogue, orders, schemes & users |
| **Retailer** | `retailer@demo.com` | `demo123` | Browse catalogue, cart, schemes, place & track orders |

---

## 🌐 API Reference

### Auth Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new retailer account | Public |
| `POST` | `/api/auth/login` | Login user & return JWT token | Public |

### Product Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all products (supports category & search query) | Public |
| `GET` | `/api/products/:id` | Retrieve single product details | Public |
| `POST` | `/api/products` | Create new product | Admin |
| `PUT` | `/api/products/:id` | Update product details / stock | Admin |
| `DELETE` | `/api/products/:id` | Delete product | Admin |

### Order Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Place a new order | Retailer |
| `GET` | `/api/orders/my` | Get orders for logged-in retailer | Retailer |
| `GET` | `/api/orders` | Get all orders | Admin |
| `PUT` | `/api/orders/:id` | Update order status | Admin |

### Scheme Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/schemes` | List active promotional schemes | Public |
| `POST` | `/api/schemes` | Create promotional scheme | Admin |
| `PUT` | `/api/schemes/:id` | Update scheme details | Admin |
| `DELETE` | `/api/schemes/:id` | Remove scheme | Admin |

### Admin Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | KPI counters, sales charts, and revenue statistics | Admin |

---

## 🚀 Deployment Guide

### Deploying the Backend on [Render](https://render.com/)

1. Create a new **Web Service** on Render and connect your GitHub repository.
2. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. Add Environment Variables under **Environment** tab:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random secret key
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or leave default Render PORT)
4. Deploy service and copy your live backend URL (e.g., `https://tradehub-api.onrender.com`).

---

### Deploying the Frontend on [Vercel](https://vercel.com/)

1. Import your GitHub repository in Vercel.
2. In the project setup:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_URL`: `https://tradehub-api.onrender.com` (Your live Render backend URL)
4. Click **Deploy**. The included `frontend/vercel.json` ensures all SPA routes resolve cleanly without 404 errors.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Developed by <a href="https://github.com/Thamizhselvankumar">Thamizhselvankumar</a>
</div>
