export const toMilitaryTime = (time: string): string => {
	const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
	if (!match) throw new Error('Invalid time format. Use HH:MM AM/PM');

	const [, hourStr, minute, meridiem] = match;
	let hour = parseInt(hourStr, 10);
	const meridiemUpper = meridiem.toUpperCase();

	if (meridiemUpper === 'PM' && hour !== 12) hour += 12;
	if (meridiemUpper === 'AM' && hour === 12) hour = 0;

	return hour.toString().padStart(2, '0') + minute;
}

export const toStandardTime = (militaryTime: string): string => {
	if (!/^[0-2]\d[0-5]\d$/.test(militaryTime)) {
		throw new Error('Invalid time format. Use HHMM 24-hour format');
	}

	let hour = parseInt(militaryTime.slice(0, 2), 10);
	const minute = militaryTime.slice(2);
	const meridiem = hour >= 12 ? 'PM' : 'AM';

	hour = hour % 12 || 12;

	return `${hour}:${minute} ${meridiem}`;
};