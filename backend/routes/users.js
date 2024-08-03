const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const initializeDatabase = require('../db/db');

//User Register
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    console.log("role",role);
    const validRoles = ['admin', 'user'];

    if (!validRoles.includes(role)) {
        return res.status(400).send('Invalid role');
    }

    let db = await initializeDatabase();

    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    
    if (existingUser) {
      res.status(401).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (username, password, role) VALUES (?,?, ?)', [username, hashedPassword, role]);
    res.status(201).send('User Registered');
});

//User Login

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        let db = await initializeDatabase();
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, 'your-jwt-secret');
            req.session.user_id = user.id;

            await db.run('INSERT INTO sessions (user_id, ip_address) VALUES (?, ?)', [user.id, req.ip]);
    
            const userSessions = await db.all('SELECT * FROM sessions WHERE user_id = ?', [user.id]);
    
            res.json({ token, sessions: userSessions });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
    });

//Get all Users

router.get('/allusers', async (req, res) => {

    let db = await initializeDatabase();
    const users = await db.all('SELECT * FROM users');
    res.json({users});
});

module.exports = router;
