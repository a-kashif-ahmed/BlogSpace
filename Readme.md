#  BlogSpace

A modern full-stack blogging platform built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. BlogSpace enables users to create an account, publish blogs, browse posts from other users, and engage through comments—all within a clean, responsive interface.

---

##  Features

*  User Authentication

  * User Signup
  * User Login
  * Secure Logout

*  Blog Management

  * Create new blogs
  * Upload blog thumbnail via URL
  * Rich blog descriptions
  * View individual blog posts

*  Blog Feed

  * Browse all published blogs
  * View only your own blogs
  * Responsive blog cards

*  Comment System

  * Authenticated users can comment
  * Displays commenter name
  * Real-time discussion on each blog

*  Modern UI

  * Custom dark theme
  * Responsive design
  * Minimal, distraction-free interface
  * Inspired by the Upins design language

---

## 🛠 Tech Stack

**Frontend**

* EJS
* HTML5
* CSS3
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JWT
* Cookies

---

##  Project Structure

```
BlogSpace
│
├── controllers
├── middleware
├── models
├── routes
├── views
│   ├── partials
│   └── blogs
├── public
├── app.js
└── package.json
```

---

##  Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/BlogSpace.git
```

Move into the project

```bash
cd BlogSpace
```

Install dependencies

```bash
npm install
```

Create a `.env`

```
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Start the server

```bash
npm start
```

Visit

```
http://localhost:8000
```

---

##  Screens

* Home
* Login
* Signup
* Blog Feed
* Single Blog
* My Blogs
* Add Blog

---

##  Future Improvements

* Image uploads with Cloudinary
* Rich text editor
* Likes & bookmarks
* User profiles
* Categories & tags
* Search functionality
* Pagination
* Markdown support

---

## Author

**Kashif Ahmed**

LinkedIn:
https://www.linkedin.com/in/a-kashif-ahmed/

---

##  License

This project is licensed under the MIT License.
