
# 🌐 PortXNect - A Developer’s Social Hub

**PortXNect** is a full-stack social media platform designed for developers to connect, collaborate, and showcase their portfolios. Built using the MERN stack with real-time capabilities and elegant animations.

🔗 **Live Website**: [https://portxnect.onrender.com](https://portxnect.onrender.com)  
💻 **GitHub Repo**: [https://github.com/Mellifluousguy/PortXnectCode](https://github.com/Mellifluousguy/PortXnectCode)

---

## ✨ Features

- 👤 Authentication (Login, Register, Forgot Password)
- 🧑‍💻 Edit Profile (Bio, Skills, Social Links)
- 🔄 Swipe-based User Connection (Like/Skip)
- 📝 Post Projects with Tech Stack, Description
- 💬 Real-time Chat (Socket.io)
- 🔔 Real-time Notifications
- 🧾 Admin Panel with User Management & Stats
- 🎨 Animated UI using Framer Motion
- 🌐 Fully Responsive Design
- 📣 Toast Alerts (React-Toastify)
- 📊 Graphical User & Project Showcase

---

## ⚙️ Tech Stack

### 🔹 Frontend
- React.js (with Vite)
- Tailwind CSS
- React Router
- Framer Motion
- React Toastify
- React Tinder Card

### 🔸 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication

---

## 📁 Folder Structure

```
📦 PortXnectCode
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── model
│   ├── routes
│   ├── templates
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo:
```bash
git clone https://github.com/Mellifluousguy/PortXnectCode.git
cd PortXnectCode
```

### 2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Setup Environment Variables:
Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

---

## ▶️ Running the App

### Start Backend:
```bash
cd backend
npm run dev
```

### Start Frontend:
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

---

## 🧑‍💻 Author

**Mohit Gupta**  
📧 [mohitdeveloperg@gmail.com](mailto:mohitdeveloperg@gmail.com)  
🔗 [GitHub](https://github.com/Mellifluousguy)  
🔗 [LinkedIn](https://linkedin.com/in/mellifluousguy)

---

## 📃 License

This project is licensed under the MIT License.
