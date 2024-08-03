const express = require('express');
const initializeDatabase = require('../db/db');
const router = express.Router();

//Get all Sessions

router.get('/', async (req, res) => {
    try {
        let db = await initializeDatabase();
        const sessions = await db.all('SELECT * FROM sessions');
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve sessions' });
    }
});

module.exports = router;
