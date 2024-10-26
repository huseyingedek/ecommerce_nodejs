import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface CustomRequest extends Request {
    user?: any;
}

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired access token' });
        }

        req.user = decoded;

        next();
    });
};

export default authMiddleware;