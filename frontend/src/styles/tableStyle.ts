export const SKILL_TEXT_BOX_WIDTH = 220;
export const SKILL_TEXT_BOX_BOTTOM = 20;
export const SKILL_CELL_HEIGHT = SKILL_TEXT_BOX_WIDTH + SKILL_TEXT_BOX_BOTTOM;

export const SKILL_TEXT_BOX_SX = {
	position: 'absolute',
	bottom: SKILL_TEXT_BOX_BOTTOM,
	left: '50%',
	transform: 'rotate(-60deg)',
	transformOrigin: 'bottom left',
	width: SKILL_TEXT_BOX_WIDTH,
	whiteSpace: 'wrap',
};

export const SKILL_CELL_SX = {
	minWidth: `${SKILL_TEXT_BOX_WIDTH * 0.3}px`,
	height: SKILL_CELL_HEIGHT,
	position: 'relative',
};