const sqlite3 = require('sqlite3').verbose();
const {open} = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

const initializeDatabase = async () => {
    const db = await open({
        filename : dbPath,
        driver : sqlite3.Database, 
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT CHECK(role IN ('admin', 'user'))
        );

        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            stock INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );

        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total REAL NOT NULL,
            status TEXT CHECK(status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            session_start DATETIME DEFAULT CURRENT_TIMESTAMP,
            session_end DATETIME,
            ip_address TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );`);
        return db;
};

module.exports = initializeDatabase