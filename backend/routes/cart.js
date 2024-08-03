const express = require('express');
const router = express.Router();
const initializeDatabase = require('../db/db');

//Get Cart Details

router.get('/', async (req, res) => {
    try {
        let db = await initializeDatabase();
        const cartItems = await db.all('SELECT * FROM carts');
        res.json(cartItems)
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

//Creating Cart Items

router.post('/add', async (req, res) => {
    const {user_id, product_id, quantity} = req.body;
    
    let db = await initializeDatabase();

    await db.run('INSERT INTO carts (user_id, product_id, quantity) VALUES (?,?,?)', [user_id, product_id, quantity]);
    res.status(201).send('Item added to cart');
});

//Delete Cart Item

router.delete('/remove', async (req, res) => {
    const {user_id, product_id} = req.body;
    
    let db = await initializeDatabase();

    await db.run('DELETE FROM carts WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
    res.status(200).send('Item removed from cart');
});

module.exports = router;