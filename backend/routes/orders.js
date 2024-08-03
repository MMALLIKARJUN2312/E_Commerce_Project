const express = require('express');
const router = express.Router();
const initializeDatabase = require('../db/db');

//Placing Order

router.post('/place', async (req, res) => {
    const {user_id} = req.body;

    let db = await initializeDatabase();

    const result = await db.get('SELECT * FROM carts WHERE user_id = ?', [user_id]);
    console.log("result",result);

    if(result.product_id){
        const productDetails = await db.get('SELECT * FROM products WHERE id = ?', [result.product_id]);
        console.log("productDetails",productDetails);

        if(!productDetails || !productDetails.stock || result.quantity > productDetails.stock){
            res.status(401).json({message : "product not found or out of stock"});
        } else{
           const total = productDetails.price*result.quantity;
            let stock = productDetails.stock - result.quantity
            await db.get('UPDATE products SET stock = ?',[stock]);
            console.log("stock",stock);
            await db.get('INSERT INTO orders (user_id, total) VALUES (?,?)',[user_id,total])
            res.status(200).json({message:"order placed",totalAmount:total})
        }
    } else{
        res.status(401).json({message : "product not found"});
    }
});

//Get Order History

router.get('/history', async (req, res) => {
    const {user_id} = req.body;
    console.log("history", user_id);
    let db = await initializeDatabase();
    const orders = await db.all('SELECT * FROM orders');
    console.log(orders);
    
    res.json(orders);
});

module.exports = router;

