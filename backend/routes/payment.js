const express = require('express');
const initializeDatabase = require('../db/db');
const router = express.Router();

//Initiating a Payment

router.post('/process/:orderId', async(req, res) => {
    const {orderId} = req.params
    let db = await initializeDatabase();
    const result = await db.run('UPDATE orders SET status = ? WHERE id = ?', ["completed",orderId]);
    console.log("result",result);
    
    res.status(200).send('Payment processed');
});

module.exports = router;