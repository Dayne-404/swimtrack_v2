import { Schema } from 'mongoose';

const nonEmptyString = (value: string): boolean => value.trim().length > 0;

export interface StudentDocument extends Document {
	name: String;
	skills: Boolean[];
	passed: Boolean;
}

const StudentSchema: Schema<StudentDocument> = new Schema({
	name: {
		type: String,
		validate: [nonEmptyString, 'Student name cannot be empty'],
		required: [true, 'Student name is required'],
	},
	skills: {
		type: [Boolean],
		required: false,
	},
	passed: {
		type: Boolean,
		required: [true, 'Passed or Failed status required'],
	},
});

export default StudentSchema;
