import { POINT_ENUM, ITEM_TYPE_ENUM } from "../enums";

const senesInfo = [
	{
		src: "trackStraight",
		point: POINT_ENUM.STRAIGHT_RAIL_POINT,
		pos_x: 0,
		pos_y: 380,
		width: 1200,
		height: 450,
		type: ITEM_TYPE_ENUM.OTHER
	},
	{
		src: "trackCornerLarge",
		point: POINT_ENUM.CORNER_RAIL_POINT,
		pos_x: 0,
		pos_y: 500,
		width: 1200,
		height: 220,
		type: ITEM_TYPE_ENUM.OTHER
	},
	// {
	// 	src: "gameTitle",
	// 	point: POINT_ENUM.CORNER_RAIL_POINT,
	// 	pos_x: 0,
	// 	pos_y: 1250,
	// 	width: 500,
	// 	height: 100,
	// 	type: ITEM_TYPE_ENUM.OTHER
	// },
]

export default senesInfo