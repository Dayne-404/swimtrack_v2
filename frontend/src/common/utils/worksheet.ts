import { LEVELS } from "../constants/levels";
import { capitalize } from "./capitalize";

export const resetStudentsSkillsArray = (worksheet: Worksheet): Worksheet => {
    if (
        worksheet.students.length === 0 ||
        worksheet.students.some((s) => s.skills.length !== LEVELS[worksheet.level].skills.length)
    ) {
        const skillCount = LEVELS[worksheet.level].skills.length;

        worksheet.students = worksheet.students.map((student) => ({
            ...student,
            skills: Array(skillCount).fill(false),
        }));
    }

    return worksheet;
};

export const validateWorksheet = (worksheetForm: WorksheetFormData, user: string | undefined, students: Student[]): WorksheetValidationErrors => {
    const errors: WorksheetValidationErrors = {};

    //Ensure all fields exist
    for (const key of Object.keys(worksheetForm) as (keyof WorksheetFormData)[]) {
		if (worksheetForm[key] === undefined || worksheetForm[key] === null) {
			errors[key] = (`${capitalize(key)} is required`);
		}
	}

    if(!user || user.trim().length === 0) {
        console.log('USER ERROR');
        errors.user = 'User is required';
    }

    if (!worksheetForm.year || !/^\d{4}$/.test(worksheetForm.year)) {
		errors.year = 'Enter a valid 4-digit year';
	}

    //TODO if (!worksheetMeta.time || !/\d{1,2}:\d{2} ?(AM|PM)/i.test(worksheetMeta.time)) { <-- Change to this when figure out am/pm
	if (!worksheetForm.time || !/\d{1,2}:\d{2}/i.test(worksheetForm.time)) {
		errors.time = 'Time must be in format HH:MM AM/PM';
	}

    const studentNameErrors = students.map((student) =>
		!student.name?.trim() ? true : false
	);

    if (studentNameErrors.some(Boolean)) {
		errors.students = studentNameErrors;
	}

    return errors;
}

export const extractFormData = (worksheet: Worksheet): WorksheetFormData => ({
    level: worksheet.level,
    session: worksheet.session,
    day: worksheet.day,
    location: worksheet.location,
    time: worksheet.time,
    year: String(worksheet.year)
})