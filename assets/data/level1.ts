import { POINT_ENUM, ITEM_TYPE_ENUM, CHOISE_ENUM } from "../enums";
import { ILevel } from "./d";

const level: ILevel = {
    levelNumber: "1",
    pointInfo: [
        {
            src: "people",
            pointType: CHOISE_ENUM.CORNER,
            pos_x: 421,
            pos_y: 540,
            width: 115,
            height: 142,
            type: ITEM_TYPE_ENUM.OTHER,
            event: null
        },
        {
            src: "people",
            pointType: CHOISE_ENUM.STRAIGHT,
            pos_x: 321,
            pos_y: 300,
            width: 115,
            height: 142,
            type: ITEM_TYPE_ENUM.OTHER,
            event: null
        },
    ],
    tip: "原始题目!!",
    question: "天呐，不好了，一辆火车正驶向5个人，你可以控制变轨使火车驶向另一条轨道，但是会杀死另外一条轨道的1个人，你会怎么做？",
    result: null
}

export default level;