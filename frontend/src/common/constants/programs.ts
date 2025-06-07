import ADULT_SKILLS from './program skills/AdultSkills';
import LEADERSHIP_SKILLS from './program skills/LeadershipSkills';
import PARENT_AND_TOT_SKILLS from './program skills/ParentAndTotSkills';
import PRESCHOOL_SKILLS from './program skills/PreschoolSkills';
import SWIMMER_SKILLS from './program skills/SwimmerSkills';
import TEEN_SKILLS from './program skills/TeenSkills';

export interface ProgramCategory {
	name: string;
	skills: string[];
}

//Order is important here. If this ever changes, the database will need to be updated.
// The order of the programs in the database is used to determine the program level for a user.

export const PROGRAMS: ProgramCategory[] = [
	{
		name: 'Parent and Tot 1',
		skills: PARENT_AND_TOT_SKILLS.PARENT_AND_TOT_1,
	},
	{
		name: 'Parent and Tot 2',
		skills: PARENT_AND_TOT_SKILLS.PARENT_AND_TOT_2,
	},
	{
		name: 'Parent and Tot 3',
		skills: PARENT_AND_TOT_SKILLS.PARENT_AND_TOT_3,
	},
	{
		name: 'Preschool 1',
		skills: PRESCHOOL_SKILLS.PRESCHOOL_1,
	},
	{
		name: 'Preschool 2',
		skills: PRESCHOOL_SKILLS.PRESCHOOL_2,
	},
	{
		name: 'Preschool 3',
		skills: PRESCHOOL_SKILLS.PRESCHOOL_3,
	},
	{
		name: 'Preschool 4',
		skills: PRESCHOOL_SKILLS.PRESCHOOL_4,
	},
	{
		name: 'Preschool 5',
		skills: PRESCHOOL_SKILLS.PRESCHOOL_5,
	},
	{
		name: 'Swimmer 1',
		skills: SWIMMER_SKILLS.SWIMMER_1,
	},
	{
		name: 'Swimmer 2',
		skills: SWIMMER_SKILLS.SWIMMER_2,
	},
	{
		name: 'Swimmer 3',
		skills: SWIMMER_SKILLS.SWIMMER_3,
	},
	{
		name: 'Swimmer 4',
		skills: SWIMMER_SKILLS.SWIMMER_4,
	},
	{
		name: 'Swimmer 5',
		skills: SWIMMER_SKILLS.SWIMMER_5,
	},
	{
		name: 'Swimmer 6',
		skills: SWIMMER_SKILLS.SWIMMER_6,
	},
	{
		name: 'Rookie',
		skills: LEADERSHIP_SKILLS.ROOKIE,
	},
	{
		name: 'Ranger',
		skills: LEADERSHIP_SKILLS.RANGER,
	},
	{
		name: 'Star',
		skills: LEADERSHIP_SKILLS.STAR,
	},
	{
		name: 'Teen',
		skills: TEEN_SKILLS.TEEN,
	},
	{
		name: 'Youth Fitness',
		skills: TEEN_SKILLS.FITNESS,
	},
	{
		name: 'Adult 1',
		skills: ADULT_SKILLS.ADULT_1,
	},
	{
		name: 'Adult 2',
		skills: ADULT_SKILLS.ADULT_2,
	},
	{
		name: 'Adult 3',
		skills: ADULT_SKILLS.ADULT_3,
	},
];

export const PROGRAM_NAMES = PROGRAMS.map((program) => program.name);
