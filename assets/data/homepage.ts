import { POINT_ENUM, ITEM_TYPE_ENUM, EVENT_ENUM } from "../enums"
import { IPointInfoItem } from "./d"

const homePageInfo: Array<IPointInfoItem> = [
	{
		src: "startPageTitle",
		pointType: POINT_ENUM.HOMEPAGE_TITLE,
		pos_x: 0,
                pos_y: 710,
                width: 938,
                height: 436,
		type: ITEM_TYPE_ENUM.OTHER,
		event: null
	},
	{
		src: "startPageTrain",
		pointType: POINT_ENUM.HOMEPAGE_TRAIN,
		pos_x: 0,
                pos_y: 244,
                width: 883,
                height: 443,
		type: ITEM_TYPE_ENUM.OTHER,
		event: null
	},
	{
		src: "startButton",
		pointType: POINT_ENUM.HOMEPAGE_START,
		pos_x: 0,
                pos_y: -268,
                width: 390,
                height: 122,
		type: ITEM_TYPE_ENUM.BUTTON,
		event: EVENT_ENUM.START
	},
	{
		src: "shareButton",
		pointType: POINT_ENUM.HOMEPAGE_SHARE,
		pos_x: 0,
                pos_y: -453,
                width: 390,
                height: 122,
		type: ITEM_TYPE_ENUM.BUTTON,
		event: null
	}
]

export default homePageInfo