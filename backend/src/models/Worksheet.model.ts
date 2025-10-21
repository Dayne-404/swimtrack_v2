import mongoose, { Schema, Document, Model } from 'mongoose';
import StudentSchema, { StudentDocument } from './Student.model';
const currentYear = new Date().getFullYear();

export interface WorksheetDocument extends Document {
	user: mongoose.Types.ObjectId;
	level: number;
	year: number;
	session: number;
	day: number;
	time: string;
	location: number;
	students: StudentDocument[];
	createdAt?: Date;
	updatedAt?: Date;
}

const WorksheetSchema: Schema<WorksheetDocument> = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: [true, 'User ID is required'],
		},
		level: {
			type: Number,
			min: 0,
			max: 21,
			required: [true, 'Level is required'],
		},
		year: {
			type: Number,
			min: [2000, 'Year must be greater than 2000'],
			max: [currentYear, 'Year cannot be in the future'],
			required: [true, 'Year is required'],
		},
		session: {
			type: Number,
			min: 0,
			max: 3,
			required: [true, 'Session is required'],
		},
		day: {
			type: Number,
			min: 0,
			max: 7,
			required: [true, 'Day is required'],
		},
		time: {
			type: String,
			match: [/^([01]\d|2[0-3])[0-5]\d$/, 'Please enter a valid time in HHMM 24-hour format'],
			required: [true, 'Time is required'],
		},
		location: {
			type: Number,
			min: 0,
			max: 1,
			required: [true, 'Location is required'],
		},
		students: {
			type: [StudentSchema],
			default: [],
			validate: {
				validator: function (value: StudentDocument[]) {
					return value.length < 11;
				},
				message: 'A worksheet can only have up to 10 students.',
			},
		},
	},
	{
		timestamps: true,
	}
);

WorksheetSchema.index({
	userId: 'text',
	level: 1,
	year: 1,
	session: 1,
	day: 1,
	time: 'text',
	location: 1,
});

const Worksheet: Model<WorksheetDocument> = mongoose.model<WorksheetDocument>(
	'Worksheets',
	WorksheetSchema
);

export default Worksheet;
