// Token decoding and check for valid
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Only for POST GET PUT DELETE
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asfasfa  (type of Token - Bearer and token - asfasfa)
        if (!token) {
            return res.status(401).json({message: 'Not authorized'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({message: 'Not authorized'});
    }
}