import jwt from 'jsonwebtoken';
import Token from '../models/Token.model';
import { Types } from 'mongoose';
import { Request } from 'express';
import { DecodedToken } from '../types/jwt.types';
import { WorksheetDocument } from '../models/Worksheet.model';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET) {
	console.error(
		'ACCESS_TOKEN_SECRET is not set. Please provide a valid secret in the environment variables.'
	);
	process.exit(1);
}

if (!REFRESH_TOKEN_SECRET) {
	console.error(
		'REFRESH_TOKEN_SECRET is not set. Please provide a valid secret in the environment variables.'
	);
	process.exit(1);
}

export const generateAccessToken = (user: { _id: Types.ObjectId | string; role: string }): string => {
	return jwt.sign({ userId: user._id.toString(), role: user.role }, ACCESS_TOKEN_SECRET, {
		expiresIn: '10m',
	});
};

export const generateRefreshToken = async (user: { _id: Types.ObjectId | string; role: string }): Promise<string> => {
	const refreshToken = jwt.sign({ userId: user._id.toString() }, REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
	await Token.create({
		userId: user._id,
		role: user.role,
		refreshToken,
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	});
	return refreshToken;
};

export const validateAccessToken = (token: string): DecodedToken => {
	const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as DecodedToken;
	return decoded;
};

export const validateRefreshToken = (token: string) => {
	jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const isAuthorized = (req: Request, resource: WorksheetDocument): boolean => {
	const user = req.user;
	return (
		user?._id === String(resource.user) ||
		user?.role === 'admin' ||
		user?.role === 'supervisor'
	  );
};

