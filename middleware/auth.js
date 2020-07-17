const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    
    const token = req.header('x-auth-token'); // Get token from header

    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    } // Check if not token

    try {
        const decoder = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoder.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Invalid token, Please enter a valid token'});
    }
}