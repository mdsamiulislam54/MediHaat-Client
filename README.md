# 💊 MediHaat - Multi-Vendor Medicine E-commerce Platform

**MediHaat** is a modern and scalable multi-vendor e-commerce platform built for the pharmaceutical industry. It allows users to browse, purchase, and manage medicines online. Sellers can manage their inventory, and admins can control and monitor the entire system — all in one place.

---

## 🌐 Live Demo

👉 [Visit MediHaat](https://your-live-site-link.com) *(Replace with your actual link)*

---

## 🧾 Description

MediHaat is a feature-rich, role-based web application designed to streamline the online medicine shopping and selling experience. It supports multiple user roles: **User**, **Seller**, and **Admin** — each with their own dynamic dashboard and functionality.

---

## 🚀 Key Features

### ✅ General
- Clean and responsive UI using **Tailwind CSS** and **DaisyUI**
- Mobile-first design approach
- Firebase Authentication (Email/Password)
- MongoDB as the primary database
- Role-based access control using `verifyAdmin`, `verifySeller`, and token-based authentication middleware

### 🛒 User Features
- Add to cart and checkout system
- Secure Stripe payment integration
- Cash on Delivery (COD) option
- View **My Orders** in tabular format
- View **Payment History**
- Product search and sort functionality
- Shop all medicines with pagination and dynamic filtering

### 🏪 Seller Features
- Dynamic **Seller Dashboard** with earnings insights
- Add, edit, and delete medicine entries
- View total paid orders and total earnings
- Advertise medicines (requires admin approval)
- View **Payment History** with status (Paid / Pending)
- Search and sort medicines by price
- Pagination support across all listings

### 🛠️ Admin Features
- Dynamic Admin Dashboard with stats:
  - Total orders
  - Pending orders
  - Total sales
- Manage all users (change roles to admin/seller/user)
- View and approve pending payments
- Accept or remove seller advertisements
- Manage banners dynamically
- Generate sales reports
- Export sales data as **PDF** or **XLSX**
- Filter sales by price range

---

## 🔒 Backend Security
- Firebase Access Token-based authentication
- Middleware: `verifyToken`, `verifyAdmin`, `verifySeller`
- Role-specific API route protection

---

## 🛠️ Tech Stack

### 🔧 Client
- React.js
- Tailwind CSS & DaisyUI
- Firebase Authentication
- React Router DOM
- React Query
- React Helmet Async
- Swiper.js
- SweetAlert2
- React Hook Form
- React Range Slider
- React To Print
- React Export Table to Excel XLSX

### ⚙️ Server
- Node.js
- Express.js
- MongoDB & Mongoose
- Stripe for payment integration
- Firebase Admin SDK
- Dotenv for environment variables

---

## 📁 Folder Structure Highlights

```bash
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── layouts/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── models/



```
🤝 Contributing
Contributions are always welcome!
Please create a pull request or open an issue for suggestions and bugs.
