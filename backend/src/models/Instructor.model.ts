import mongoose, { Schema, Document, Model } from 'mongoose';

export interface InstructorType {
    firstName: string;
	lastName?: string;
	email: string;
	password: string;
	avatarColor: string;
	role: 'admin' | 'supervisor' | 'instructor';
	active: boolean;
}

interface InstructorDocument extends InstructorType, Document {
	createdAt?: Date;
	updatedAt?: Date;
}

const instructorSchema: Schema<InstructorDocument> = new Schema(
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

export const Instructor: Model<InstructorDocument> = mongoose.model<InstructorDocument>(
	'Instructor',
	instructorSchema
);
