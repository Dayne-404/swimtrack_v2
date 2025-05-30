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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const { email, password } = req.body;

	if(!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User with email address does not exist' });
		}

		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Incorrect password' });
		}

		const { _id, role } = user;
		const accessToken = generateAccessToken({ _id, role });
		const refreshToken = await generateRefreshToken({ _id, role });

		res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (error) {
		next(error);
	}
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token required' });
	}

	try {
		const storedToken = await Token.findOne({ refreshToken });

		if (!storedToken) {
			return res.status(403).json({ message: 'Invalid refresh token' });
		}

		validateRefreshToken(storedToken.refreshToken);
		const { userId, role } = storedToken;
		const newAccessToken = generateAccessToken({ _id: userId.toString(), role });
		res.status(200).json({ accessToken: newAccessToken });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ message: 'Refresh token is required' });
	}

	try {
		const deletedToken = await Token.findOneAndDelete({ refreshToken });

		if(!deletedToken) {
			return res.status(403).json({ message: 'Token not found' });
		}
		
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		next(error);
	}
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
	console.log(req.headers);
	
	const authHeader = req.headers['authorization'];
	const accessToken = authHeader && authHeader.split(' ')[1];

	if (!accessToken) {
		return res.status(401).json({ message: 'Access token required' });
	}

	try {
		const decoded = validateAccessToken(accessToken);
		req.user = { _id: decoded.userId, role: decoded.role };
		next();
	} catch (error) {
		next(error);
	}
};
