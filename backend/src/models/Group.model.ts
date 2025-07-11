import mongoose, { Schema, Document, Model } from 'mongoose';

export interface GroupDocument extends Document {
	user: Schema.Types.ObjectId;
	name: string;
	worksheets: mongoose.Types.ObjectId[];
	createdAt?: Date;
	updatedAt?: Date;
}

const GroupSchema: Schema<GroupDocument> = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			required: [true, 'User ID is required'],
		},
		name: {
			type: String,
			required: true,
		},
		worksheets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Worksheets',
			},
		],
	},
	{ timestamps: true }
);

const Group: Model<GroupDocument> = mongoose.model<GroupDocument>('Groups', GroupSchema);

export default Group;
