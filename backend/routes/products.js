const express = require('express');
const router = express.Router();
const checkAdmin = require('../middleware/auth');
const initializeDatabase = require('../db/db');

//Get Product Details

router.get('/', async (req, res) => {
    try {
        let db = await initializeDatabase();
        const products = await db.all('SELECT * FROM products');
        res.json(products);
    } catch(error) {
        res.status(500).json({error : error.message});
    }
});

//Get Product By Id

router.get('/:id', async (req, res) => {
    try {
        let db = await initializeDatabase();
        const product = await db.get('SELECT * FROM products WHERE id = ? ', [req.params.id]);

        if (!product) {
            res.status(404).json({error : 'Product not found'});
        } 
        res.json(product);
    } catch(error) {
        res.status(500).json({error : error.message});
    }
});

//Creating Product

router.post('/', checkAdmin,async (req, res) => {
    const {name, description, price, stock} = req.body;
    if (!name || !description || !price || !stock) {
        return res.status(400).json({error : 'Please provide all required fields'});
    }

    try {
        let db = await initializeDatabase();
        const result = await db.run('INSERT INTO products (name, description, price, stock) VALUES (?,?,?,?)', [name, description, price, stock]);
        res.status(201).json({id : result.lastID, name, description, price, stock});
    } catch(error) {
        res.status(500).json({error : error.message});
    }
});

//Updating Product

router.put('/:id',checkAdmin, async (req, res) => {
    const {name, description, price, stock} = req.body;

    if (!name || !description || !price || !stock) {
        return res.status(400).json({error : 'Please provide all required fields'});
    }

    try {
        let db = await initializeDatabase();
        const result = await db.run('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [name, description, price, stock, req.params.id]);

        if (result.changes === 0) {
            return res.status(404).json({error : 'Product not found'});
        }
        res.json({id : req.params.id, name, description, price, stock});
    } catch (error) {
        res.status(500).json({error : error.message})
    }
});

//Deleting Product

router.delete('/:id', checkAdmin, async (req, res) => {
    try {
        let db = await initializeDatabase();
        const result = await db.run('DELETE FROM products WHERE id = ?', [req.params.id]);
        
        if (result.changes === 0) {
            return res.status(404).json({error : 'Product not found'});
        }
        res.json('Product deleted');
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})

module.exports = router