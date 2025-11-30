# UNIFY - Swiss-Style MERN E-Commerce Platform

UNIFY is a full-stack clothing e-commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features a minimalist "Swiss Style" design philosophy, robust JWT authentication using HTTP-Only cookies, a hybrid shopping cart system, and automated email notifications.

## 🚀 Key Features

### Frontend (Client)

- **Swiss Design System:** Minimalist UI using **Tailwind CSS v4**, strictly gridded layouts, and `Inter`/`Helvetica` typography.
- **State Management:** Powered by **Zustand**. No complex Redux boilerplate.
- **Hybrid Cart Logic:** \* _Guest:_ Cart stored in `localStorage`.
  - _Logged In:_ Cart automatically syncs to MongoDB database.
- **Product Discovery:**
  - Real-time Search (Name & Description).
  - Filtering (Category, Size).
  - Pagination.
- **User Dashboard:** Order history with a visual "Glowing Bulb" status tracker.

### Backend (Server)

- **Secure Auth:** **JWT** (JSON Web Tokens) stored in **HTTP-Only Cookies** (XSS & CSRF protection).
- **REST API:** Modular architecture handling Users, Products, Carts, and Orders.
- **Email Service:** Integrated **Nodemailer** to send HTML order confirmations.
- **Data Seeding:** Script to populate the database with dummy clothing data.

---

## 🛠️ Tech Stack

| Domain       | Technologies                                                                 |
| :----------- | :--------------------------------------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS v4, Zustand, Axios, Lucide React, React Router v6 |
| **Backend**  | Node.js, Express.js, Cookie-Parser, Nodemailer, Bcryptjs                     |
| **Database** | MongoDB, Mongoose                                                            |

---

## 📂 Project Structure

```text
root/
├── backend/             # Server-side logic
│   ├── config/          # DB Connection
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth & Error handling
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   ├── server.js        # Entry point
│   └── seedProducts.js  # Data seeder
│
├── frontend/            # Client-side logic
│   ├── src/
│   │   ├── components/  # Reusable UI (Navbar, Filters)
│   │   ├── lib/         # Axios instance
│   │   ├── pages/       # Views (Home, Product, Cart, Profile)
│   │   ├── store/       # Zustand Stores (Auth, Cart)
│   │   └── App.jsx      # Main Router
│   └── tailwind.config  # Design tokens
```

## ⚙️ Installation & Setup

1. Prerequisites
   Node.js (v18+ recommended)

MongoDB (Local or Atlas URL)

2. Backend Setup
   Navigate to the backend folder and install dependencies:

```
cd backend
npm install
```

### .env

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/clothing_store
JWT_SECRET=your_super_secret_key
NODE_ENV=development

# Email Settings (Gmail App Password recommended)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Seed the Database: Populate the store with 25+ dummy products.

```
node seedProducts.js
```

3. Frontend Setup

```
cd frontend
npm install
npm run dev
```
