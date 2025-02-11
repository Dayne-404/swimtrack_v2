import { NextFunction, Request, Response } from 'express';
import User from '../models/User.model';
import argon2 from 'argon2';
import {
	generateAccessToken,
	generateRefreshToken,
	validateRefreshToken,
	validateAccessToken,
} from '../utils/authentication';
import Token from '../models/Token.model';

export const login = async (req: Request, res: Response): Promise<void> => {
	console.log('\nUser attempting to login');

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			res.status(400).json({ message: 'Incorrect password' });
			return;
		}

		const { _id, role } = user;
		const accessToken = generateAccessToken({ _id, role });
		const refreshToken = await generateRefreshToken({ _id, role });

		res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
	console.log('\nUser refreshing token');

	const { refreshToken } = req.body;

	if (!refreshToken) {
		res.status(401).json({ message: 'Refresh token required' });
		return;
	}

	try {
		const storedToken = await Token.findOne({ refreshToken });

		if (!storedToken) {
			res.status(403).json({ message: 'Invalid refresh token' });
			return;
		}

		validateRefreshToken(storedToken.refreshToken);
		const { userId, role } = storedToken;
		const newAccessToken = generateAccessToken({ _id: userId.toString(), role });
		res.status(200).json({ accessToken: newAccessToken });
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		res.status(400).json({ message: 'Refresh token is required' });
		return;
	}

	try {
		await Token.deleteOne({ refreshToken });
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

	if (!accessToken) {
		res.status(401).json({ message: 'Access token required' });
		return;
	}

	try {
		const decoded = validateAccessToken(accessToken);
		req.user = { _id: decoded.userId, role: decoded.role };
		next();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(403).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
	const adminPassword = process.env.ADMIN_PASSWORD;
	if(req.headers.authorization !== `Bearer ${adminPassword}`) {
		res.status(403).json({ message: 'Unauthorized' });
		return;
	}
	
	next();
}
