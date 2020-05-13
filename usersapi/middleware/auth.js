const jwt = require('jsonwebtoken');
const config =require('config');

//middleware to verify jwt token authorization

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    //check if token
    if(!token)
    {
        return res.status(401).json({ msg : "No token, authorisation required !" });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg : 'Token is not valid' });
    }
}