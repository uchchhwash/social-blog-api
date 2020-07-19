const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (!req.get('Authorization')) {
        const error = new Error('Authorization Token Not Provided');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.get("jwtPrivateKey"))
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Errpr('Not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}