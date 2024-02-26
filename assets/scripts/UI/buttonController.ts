import { Component, _decorator } from "cc";
import { EVENT_ENUM } from "../../enums";
import EventManger from "../../Runtime/EventManager";

const {ccclass} = _decorator


@ccclass("ButtonController")
export default class ButtonController extends Component {
	handleCtrl() {
		EventManger.Instance.emit(EVENT_ENUM.NEXT_LEVEL)
	}
}