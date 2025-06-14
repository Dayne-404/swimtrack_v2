import ADULT_SKILLS from './levelSkills/AdultSkills';
import LEADERSHIP_SKILLS from './levelSkills/LeadershipSkills';
import PARENT_AND_TOT_SKILLS from './levelSkills/ParentAndTotSkills';
import PRESCHOOL_SKILLS from './levelSkills/PreschoolSkills';
import SWIMMER_SKILLS from './levelSkills/SwimmerSkills';
import TEEN_SKILLS from './levelSkills/TeenSkills';

export interface LevelCategory {
	name: string;
	skills: string[];
}

//Order is important here. If this ever changes, the database will need to be updated.
// The order of the programs in the database is used to determine the program level for a user.

export const LEVELS: LevelCategory[] = [
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
		name: 'Rookie Patrol',
		skills: LEADERSHIP_SKILLS.ROOKIE,
	},
	{
		name: 'Ranger Patrol',
		skills: LEADERSHIP_SKILLS.RANGER,
	},
	{
		name: 'Star Patrol',
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

export const LEVEL_NAMES = LEVELS.map((level) => level.name);
