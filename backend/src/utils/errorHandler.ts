import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    } else {
        console.error('An unknown error occurred');
        res.status(500).json({ message: 'An unknown error occurred' });
    }
};