import { LEVELS } from "../constants/levels";

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

export const extractFormData = (worksheet: Worksheet): WorksheetFormData => ({
    level: worksheet.level,
    session: worksheet.session,
    day: worksheet.day,
    location: worksheet.location,
    time: worksheet.time,
    year: String(worksheet.year)
})