const initializeDatabase = require("../db/db");

const checkAdmin = async (req, res, next) => {
    const userId = req.session.user_id;
    console.log("user_id",userId);
    if (!userId) {
        return res.status(401).json({error : 'Unauthorized'});
    } 

    try {
        let db = await initializeDatabase();
        const user = await db.get('SELECT role FROM users WHERE id = ?', [userId]);
        console.log("UD",user);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
          }
        next();
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

module.exports = checkAdmin;