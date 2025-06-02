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
		ref: 'Users',
		required: true,
	},
	refreshToken: {
		type: String,
		unique: true,
		required: true,
		index: true,
	},
	expiresAt: {
		type: Date,
		required: true,
		expires: 0,
	},
});

const Token: Model<TokenDocument> = mongoose.model<TokenDocument>('Token', TokenSchema);

export default Token;
