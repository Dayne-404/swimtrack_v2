import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
	_id: mongoose.Types.ObjectId;
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
	avatarColor: string;
	role: 'admin' | 'supervisor' | 'instructor';
	active: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema: Schema<UserDocument> = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
		avatarColor: {
			type: String,
			default: '#0288d1',
			required: true,
		},
		role: {
			type: String,
			enum: ['admin', 'supervisor', 'instructor'],
			default: 'instructor',
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
			required: true,
		},
	},
	{ timestamps: true }
);

export const User: Model<UserDocument> = mongoose.model<UserDocument>('Users', UserSchema);
