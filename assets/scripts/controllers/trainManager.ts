/*
火车相关的功能封装
1. 渲染显示火车
2. 火车行动以及动画
*/
import { Component, _decorator, Node, Sprite, UITransform, Layers, BoxCollider2D, Vec3, Tween, Animation, RigidBody2D, ERigidBody2DType, Vec2, PolygonCollider2D } from "cc";
import { CHOISE_ENUM, EVENT_ENUM } from "../../enums";
import DataManager from "../../Runtime/DateManager";
import EventManger from "../../Runtime/EventManager";
import { loadRes } from "../utils";

const { ccclass } = _decorator;

const TRAIN_INFO = {
	pos_x: -421,
	pos_y: 570,
	width: 400,
	height: 200,
}

@ccclass("trainManager")
export class TrainManager extends Component {
	x = 421
	y = -570

	async init() {
		const spriteFrames = await loadRes("img/train")
		this.renderTrain(spriteFrames)
	}
	renderTrain(spriteFrames: any) {
		const node = new Node()
		DataManager.Instance.train = node
		DataManager.Instance.trainManager = this
		const sprite = node.addComponent(Sprite)
		sprite.spriteFrame = spriteFrames.find(v => v.name === "trainStraight")
		this.setUITransform(TRAIN_INFO, node)
		node.setParent(this.node)
		this.addRigidBody(node)
		this.addCollider(node)
		EventManger.Instance.on(
			EVENT_ENUM.CONFIRM_CHOISE, DataManager.Instance.trainManager.move
		)
	}

	setUITransform(element: any, node: Node) {
		// 设置首页元素UI显示相关的一些数据
		const transform = node.addComponent(UITransform)
		transform.setContentSize(element.width, element.height)
		node.layer = 1 << Layers.nameToLayer("UI_2D")
		node.setPosition(element.pos_x, element.pos_y)
	}

	move() {
		if (DataManager.Instance.questionChoice === CHOISE_ENUM.STRAIGHT) {
			DataManager.Instance.trainManager.moveS()
		} else {
			DataManager.Instance.trainManager.moveC()
		}
	}

	moveS() {
		let targetPos = new Vec3(821, 150, 0); // 设置目标位置
		let duration = 1; // 设置移动时间
		let t = new Tween(
			DataManager.Instance.train).to(
				duration, { position: targetPos }
			) // 设置移动时间和目标位置
		t.start()
	}
	moveC() {
		let targetPos1 = new Vec3(-180, 480, 0); // 设置目标位置
		let targetPos2 = new Vec3(300, 570, 0); // 设置目标位置
		let targetPos3 = new Vec3(821, 430, 0); // 设置目标位置
                let duration = 0.4; // 设置移动时间
                let t = new Tween(
                        DataManager.Instance.train).to(
                                duration-0.1, { position: targetPos1 }
                        ) // 设置移动时间和目标位置
		t.to(duration, { position: targetPos2 })
		t.to(duration, { position: targetPos3 })
                t.start()
	}
	addRigidBody(node: Node) {
		const rigidBody = node.addComponent(RigidBody2D)
		rigidBody.type = ERigidBody2DType.Dynamic
		rigidBody.group = 0
		rigidBody.allowSleep = true
		rigidBody.awakeOnLoad = true
		rigidBody.gravityScale = 0
		rigidBody.enabledContactListener = true
		// const p = new Vec2(100, 100)
		// rigidBody.applyLinearImpulseToCenter(p, true) 
	}

	addCollider(node: Node) {
		const boxCollider = node.addComponent(PolygonCollider2D)
		boxCollider.threshold = 1
		boxCollider.group = 0
		boxCollider.density = 1
		boxCollider.friction = 0.2
		boxCollider.node.on(
			'onCollisionEnter', (event) => {
				console.log('小汽车撞到篮球了！', event);
				// 给篮球施加一个向上的冲量
			    }
		)
	}
}