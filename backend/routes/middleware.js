import 'dotenv/config'; 
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // console.log(`key:: ${secretKey}`);
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // console.log(`token::  ${token}`);
        
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export { authMiddleware }
