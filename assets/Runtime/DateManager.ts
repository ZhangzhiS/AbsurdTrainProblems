import {Node} from "cc"
import Singleton from "../Base/Singleton";
import QuestionManager from "../scripts/controllers/questionManager";
import { TrackManager } from "../scripts/controllers/trackManager";
import { TrainManager } from "../scripts/controllers/trainManager";
import { CHOISE_ENUM } from "../enums";
import { SwitchManager } from "../scripts/controllers/switchManager";

export default class DataManager extends Singleton{
	static get Instance() {
		return super.GetInstance<DataManager>()
	      }
	question: Node | null
	questionManager: QuestionManager
	stage: Node | null
	track: TrackManager
	train: Node | null
	trainManager: TrainManager
	switchManager: SwitchManager

	straightTrack: Node | null
	straightTrackPoint: Node | null
	cornerTrack: Node | null
	cornerTrackPoint: Node | null

	levelIndex: number = 1
	levelInfo: Record<string, any> = {}

	questionChoice: CHOISE_ENUM = CHOISE_ENUM.STRAIGHT

	private constructor(){
		super()
		this.reset()
	}

	reset(){
                this.question = null
		this.questionChoice = CHOISE_ENUM.STRAIGHT
                // this.train = this.train.resetInEditor()
        }
}