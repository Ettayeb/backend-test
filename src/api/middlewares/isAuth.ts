import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[0];
        console.log(token);

        const decodedToken = jwt.verify(token, config.jwtSecret);

        req.payload = decodedToken;
        next();
    } catch {
        return res.status(401).json({
            error: new Error('Invalid request!'),
        });
    }
};
