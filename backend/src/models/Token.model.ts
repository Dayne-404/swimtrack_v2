import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TokenDocument extends Document {
	userId: mongoose.Schema.Types.ObjectId;
	role: string;
	refreshToken: string;
	expiresAt: Date;
}

const TokenSchema: Schema<TokenDocument> = new Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Instructor',
		required: true,
	},
	role: {
		type: String,
		enum: ['admin', 'supervisor', 'instructor'],
		default: 'instructor',
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

const Token: Model<TokenDocument> = mongoose.model<TokenDocument>('Token', TokenSchema);

export default Token;
