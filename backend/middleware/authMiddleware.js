import jwt from 'jsonwebtoken';

export const authMiddleware = (roles) => (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Forbidden' });
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};