import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }

    return res.status(500).json({message: 'An unexpected error occurred while processing your request. Please try again later.'})
}