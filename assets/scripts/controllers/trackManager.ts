/*
铁轨相关资源控制
1. 渲染铁轨
2. 控制轨道的透明度，突出火车给哪个方向跑
*/
import { Component, _decorator, Node, Sprite, UITransform, Layers, Color } from "cc";
import senesInfo from "../../data/trackInfo";
import { CHOISE_ENUM } from "../../enums";
import DataManager from "../../Runtime/DateManager";
import { loadRes } from "../utils";

const { ccclass } = _decorator;


@ccclass("TrackManager")
export class TrackManager extends Component {
	init() {
		DataManager.Instance.track = this
		this.renderTrack()
	}

	async renderTrack() {
		// 渲染铁轨
		const spriteFrames = await loadRes("img/track")
		for (let i = 0; i < senesInfo.length; i++) {
			const element = senesInfo[i];
			const node = new Node(element.src)
			const sprite = node.addComponent(Sprite)
			sprite.spriteFrame = spriteFrames.find(v => v.name === element.src)
			if (element.src === CHOISE_ENUM.CORNER) {
				DataManager.Instance.cornerTrack = node
				sprite.color = new Color(255, 255, 255, 69)
			} else {
				DataManager.Instance.straightTrack = node
			}
			this.setUITransform(element, node)
			node.setParent(this.node)
		}
	}

	changeTrackRender() {
		if (DataManager.Instance.questionChoice === CHOISE_ENUM.STRAIGHT) {
			DataManager.Instance.straightTrack.getComponent(Sprite).color = new Color(255, 255, 255, 69)
			DataManager.Instance.cornerTrack.getComponent(Sprite).color = new Color(255, 255, 255, 255)
			DataManager.Instance.questionChoice = CHOISE_ENUM.CORNER
		} else {
			DataManager.Instance.straightTrack.getComponent(Sprite).color = new Color(255, 255, 255, 255)
			DataManager.Instance.cornerTrack.getComponent(Sprite).color = new Color(255, 255, 255, 69)
			DataManager.Instance.questionChoice = CHOISE_ENUM.STRAIGHT
		}
	}

	setUITransform(element: any, node: Node) {
		// 设置首页元素UI显示相关的一些数据
		const transform = node.addComponent(UITransform)
		transform.setContentSize(element.width, element.height)
		node.layer = 1 << Layers.nameToLayer("UI_2D")
		node.setPosition(element.pos_x, element.pos_y)
	}
	

}
