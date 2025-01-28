import { Request, Response } from 'express';
import { Instructor, InstructorType } from '../models/Instructor.model';
import argon2 from 'argon2';

export const createInstructor = async (req: Request, res: Response): Promise<void> => {
	console.log('\nCreating new user');

	const newInstructor: InstructorType = req.body;

	try {
		const instructorExists = await Instructor.findOne({ email: newInstructor.email });

		if (instructorExists) {
			res.status(400).json({ message: 'User already exists', type: 0 });
			return;
		}

		const hashedPassword = await argon2.hash(newInstructor.password);

		const newInstructorDocument = await Instructor.create({
			...newInstructor,
			password: hashedPassword,
		});

        console.log('Sucessfully created new user with details');
        console.log('-----------------------------------------');
        console.log(`${newInstructorDocument.firstName}, ${newInstructorDocument.lastName || ''}`);
        console.log(`Email: ${newInstructorDocument.email}`);
        console.log(`HashedPassword: ${newInstructorDocument.password}`);
        console.log(`Role: ${newInstructorDocument.role}`);
        console.log(`Active: ${newInstructorDocument.active}`);
        console.log(`AvatarColor: ${newInstructorDocument.avatarColor}`);
        console.log('-----------------------------------------');

		res.status(200).json(newInstructorDocument);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};
