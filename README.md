# 📝 Postify

### A simple social posting web app built with Node.js, Express, MongoDB, and Tailwind CSS.

---

## 📌 Overview  
**Postify** is a full-stack social web application that allows users to create accounts, log in securely, share posts, like others’ posts, and upload profile pictures.  
It’s built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Tailwind CSS**, using **JWT authentication** for user sessions and **Multer** for handling image uploads.

---

## 🚀 Features  
✅ **User Authentication** – Secure login and registration using JWT & bcrypt.  
✅ **Post Creation & Editing** – Users can add, update, or delete posts.  
✅ **Likes System** – Like or unlike posts easily.  
✅ **Profile Management** – Upload and display profile pictures.  
✅ **Protected Routes** – Access control via JWT middleware.  
✅ **Clean UI** – Tailwind CSS for a modern, responsive interface.  

---

## 🧩 Tech Stack  
| Layer | Technology |
|-------|-------------|
| **Frontend** | EJS, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT, bcrypt |
| **File Uploads** | Multer + crypto |
| **Templating** | EJS |

---

## 📁 Folder Structure  
Postify/
│
├── models/
│   ├── user.js
│   └── post.js
│
├── public/
│   ├── images/uploads/
│   └── ...
│
├── utils/
│   └── multerconfig.js
│
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   ├── edit.ejs
│   └── profileupload.ejs
│
├── app.js
├── server.js
├── .env
└── package.json
