import { CHOISE_ENUM, EVENT_ENUM, ITEM_TYPE_ENUM, POINT_ENUM } from "../enums";

export interface IPointInfoItem {
    pointType: CHOISE_ENUM
    src: string
    pos_x: number
    pos_y: number
    width: number
    height: number
    type: ITEM_TYPE_ENUM 
    event: EVENT_ENUM | null
}

export interface ILevel {
    levelNumber: string
    pointInfo: Array<IPointInfoItem>
    tip: string
    question: string
    result: string | null
}

