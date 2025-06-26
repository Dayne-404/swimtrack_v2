import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
	status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const message = err.message || 'An unknown error occurred';

	console.error(`[${status}] ${message}`);

	res.status(status).json({ message });
};
