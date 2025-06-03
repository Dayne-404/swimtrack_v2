import { NextFunction, Request, Response } from 'express';
import User, { UserDocument } from '../models/User.model';
import argon2 from 'argon2';
import {
	generateAccessToken,
	generateRefreshToken,
	validateRefreshToken,
	validateAccessToken,
} from '../utils/authentication';
import Token from '../models/Token.model';
import { verify } from 'crypto';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const { email, password } = req.body;

	if (!email || !password) {
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

		const { _id, firstName, lastName, avatarColor, role } = user;

		const accessToken = generateAccessToken({
			_id: _id.toString(),
			firstName,
			lastName,
			avatarColor,
			role,
		});
		const refreshToken = await generateRefreshToken(_id);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		res.status(200).json({ accessToken });
	} catch (error) {
		next(error);
	}
};

export const refreshAccessToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.status(401).json({ message: 'No refresh token' });
	}

	try {
		const payload = validateRefreshToken(refreshToken);

		// payload may be string or JwtPayload, so check type and extract userId
		const userId = typeof payload === 'string' ? payload : payload.userId;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(403).json({ message: 'Invalid refresh token' });
		}

		const { _id, firstName, lastName, avatarColor, role } = user;

		const newAccessToken = generateAccessToken({
			_id: _id.toString(),
			firstName,
			lastName,
			avatarColor,
			role,
		});
		res.status(200).json({ accessToken: newAccessToken });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});

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
