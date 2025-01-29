import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TokenDocument extends Document {
	userId: Schema.Types.ObjectId;
	refreshToken: string;
	expiresAt: Date;
}

const TokenSchema: Schema<TokenDocument> = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'Instructor',
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
