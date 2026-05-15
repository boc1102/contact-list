# Express + EJS + Webpack MVC Learning Project (Contact List)

This repository contains a small **MVC-based contact list project**, developed during my learning process with **Express**, **EJS**, **Webpack**, and **MongoDB**.

## 📌 Purpose

The main goal of this project is to understand how to structure a Node.js application using the **MVC (Model–View–Controller)** pattern while integrating common tools commonly used in modern web development.

Unlike the previous version that used SQLite, this project now uses **MongoDB** as its database solution, allowing a more realistic experience working with external databases and connection-based environments.

This project focuses on:

- Structuring an application using **MVC**
- Handling routes and business logic with **Express**
- Rendering dynamic views using **EJS**
- Managing data persistence with **MongoDB**
- Working with authentication and user-based data handling

## ✨ Features

- User registration
- Login and session handling
- Contact management system for each user
- Full CRUD operations for contacts:
  - Create contacts
  - View contacts
  - Update contacts
  - Delete contacts

## ⚙️ Environment Variables

Create a `.env` file in the project root and add the following variables:

- PORT (Port)
- MONGO_URI (MongoDB connection string)

Example:

```env
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
```

## 🚧 Disclaimer

This is an educational project, not intended for production use. Some implementations may be simplified, unoptimized, or experimental, as the primary focus is learning and experimentation with the technologies involved.