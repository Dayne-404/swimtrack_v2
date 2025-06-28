export const toMilitaryTime = (time: string): string => {
	const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
	if (!match) throw new Error('Invalid time format. Use HH:MM AM/PM');

	let [, hourStr, minute, meridiem] = match;
	let hour = parseInt(hourStr, 10);
	meridiem = meridiem.toUpperCase();

	if (meridiem === 'PM' && hour !== 12) hour += 12;
	if (meridiem === 'AM' && hour === 12) hour = 0;

	return hour.toString().padStart(2, '0') + minute;
}