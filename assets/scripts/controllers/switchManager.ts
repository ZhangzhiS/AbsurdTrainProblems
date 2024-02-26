/*
开关的管理
1. 渲染开关
2. 设置开关
3. 渲染相关动画
*/
import { Asset, Button, Component, EventHandler, Layers, Node, resources, Sprite, SpriteFrame, UITransform, _decorator } from "cc";
import { CHOISE_ENUM, EVENT_ENUM } from "../../enums";
import DataManager from "../../Runtime/DateManager";
import EventManger from "../../Runtime/EventManager";
import { loadRes } from "../utils";

const { ccclass } = _decorator;

const SWITCH_INFO = {
	switchButton: {
		pos_x: -250,
		pos_y: -800,
                width: 400,
                height: 160,
		event: EVENT_ENUM.CHOISE_DIRECTION
	},
	confirmButton: {
		pos_x: 250,
		pos_y: -800,
                width: 400,
                height: 160,
		event: EVENT_ENUM.CONFIRM_CHOISE
	},
	switchLeft: {
		pos_x: -350,
                pos_y: 200,
                width: 65,
                height: 85,
		fontSize: 60,
		lineHeight: 80
	},
	switchRight: {
		pos_x: -350+65,
                pos_y: 200,
                width: 65,
                height: 85,
		fontSize: 60,
		lineHeight: 80
	}
}

@ccclass("SwitchManager")
export class SwitchManager extends Component {

	public switchNode: Node
	private _switch: string = "switchLeft"
	private _spriteFrames

	async init() {
		DataManager.Instance.switchManager = this
		DataManager.Instance.switchManager.switchNode = new Node()
		const spriteFrames = await loadRes("img/switch")
		this._spriteFrames = spriteFrames
		this.renderButton("switchButton", spriteFrames);
		this.renderButton("confirmButton", spriteFrames);
		this.renderSwitch(this._switch, spriteFrames)
	}

	changeSwitch() {
		if (DataManager.Instance.questionChoice === CHOISE_ENUM.STRAIGHT) {
			DataManager.Instance.switchManager._switch = "switchLeft"
			DataManager.Instance.switchManager.reRenderSwitch(DataManager.Instance.switchManager._switch, DataManager.Instance.switchManager._spriteFrames)
		} else {
			DataManager.Instance.switchManager._switch = "switchRight"
                        DataManager.Instance.switchManager.reRenderSwitch(DataManager.Instance.switchManager._switch, DataManager.Instance.switchManager._spriteFrames)
		}
	}
	
	renderButton(buttonType: string, spriteFrames: any) {
		const node = new Node()
		const sprite = node.addComponent(Sprite)
		sprite.spriteFrame = spriteFrames.find(v => v.name === buttonType)
		const buttonInfo = SWITCH_INFO[buttonType]
		this.setUITransform(buttonInfo, node)
		this.setButtonAttr(node, buttonInfo.event)
		node.setParent(this.node)
	}

	setButtonAttr(node: Node, event: EVENT_ENUM) {
		console.log(event)
		const clickEventHandler = new EventHandler();
		clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
		clickEventHandler.component = "SwitchManager";// 这个是脚本类名
		clickEventHandler.handler = "handler"
		clickEventHandler.customEventData = event
	
		const button = node.addComponent(Button)
		button.transition = Button.Transition.SCALE
		button.zoomScale = 0.9
		button.clickEvents.push(clickEventHandler) 
	    }
	
	handler(_, event_data: string) {
		console.log(event_data)
		EventManger.Instance.emit(event_data)
	    }

	setUITransform(element: any, node: Node) {
		// 设置首页元素UI显示相关的一些数据
		const transform = node.addComponent(UITransform)
		transform.setContentSize(element.width, element.height)
		node.layer = 1 << Layers.nameToLayer("UI_2D")
		node.setPosition(element.pos_x, element.pos_y)
	}

	renderSwitch(switchType: string, spriteFrames: any) {
		const node = DataManager.Instance.switchManager.switchNode
		const sprite = node.addComponent(Sprite)
		sprite.spriteFrame = spriteFrames.find(v => v.name === DataManager.Instance.switchManager._switch)
		const switchInfo = SWITCH_INFO[switchType]
		this.setUITransform(switchInfo, node)
		node.setParent(this.node)
	}

	reRenderSwitch(switchType: string, spriteFrames: any) {
		const node = DataManager.Instance.switchManager.switchNode
		const sprite = node.getComponent(Sprite)
		sprite.spriteFrame = spriteFrames.find(v => v.name === DataManager.Instance.switchManager._switch)
		const switchInfo = SWITCH_INFO[switchType]
		this.setUITransform(switchInfo, node)
		node.setParent(this.node)
	}
}
