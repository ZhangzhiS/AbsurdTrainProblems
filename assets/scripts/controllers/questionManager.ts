/*
问题相关的功能
1. 渲染问题显示
    1. A点元素
    2. B点元素
    3. 问题正文显示
    4. 问题等级显示
    5. 问题简单标题
    6. 结果渲染（无对错，只有统计，和你选择一样的人，这个选择死了多少个人）
    7. 下一题
	1. 清空上一题的渲染
2. 各点元素动画相关的控制
3. 
*/
import {
	Color, Component, Label, _decorator, Node, UITransform, Layers,
	Sprite, TTFFont, Collider,
	director,
	RigidBody2D,
	PolygonCollider2D,
	Vec2,
	ERigidBody2DType,
	Contact2DType,
	PhysicsSystem2D
} from "cc";
import { ILevel } from "../../data/d";
import { CHOISE_ENUM, EVENT_ENUM } from "../../enums";
import DataManager from "../../Runtime/DateManager";
import EventManger from "../../Runtime/EventManager";
import { loadFont, loadRes } from "../utils";

const { ccclass } = _decorator;

const LEVEL_RENDER_INFO = {
	tips: {
		pos_x: 0,
		pos_y: 1000,
		width: 400,
		height: 80,
		fontSize: 65,
		lineHeight: 65,
	},
	level: {
		pos_x: 0,
		pos_y: 1100,
		width: 400,
		height: 80,
		fontSize: 50,
		lineHeight: 50,
	},
	question: {
		pos_x: 0,
		pos_y: -300,
		width: 1000,
		height: 340,
		fontSize: 60,
		lineHeight: 80
	},
	people: {
		pos_x: 0,
		pos_y: -300,
		width: 1000,
		height: 340,
	}
}

@ccclass("QuestionManager")
export default class QuestionManager extends Component {
	private _font: TTFFont
	async init() {
		this._font = await loadFont("font/Muyao-Softbrush")
		this.showLevelTitle()
		this.renderTrackPoint()
		DataManager.Instance.questionManager = this
		EventManger.Instance.on(
			EVENT_ENUM.CHOISE_DIRECTION,
			DataManager.Instance.questionManager.changeTrackPoint
		)
	}

	showLevelTitle() {
		this.renderLabel(DataManager.Instance.levelInfo.question, "question")
		this.renderLabel(DataManager.Instance.levelInfo.tip, "tips")
		const levelTitle = "Level: " + DataManager.Instance.levelInfo.levelNumber
		this.renderLabel(levelTitle, "level")
	}

	renderLabel(label_str: string, renderType: string) {
		const node = new Node(label_str)
		const label = node.addComponent(Label)
		label.string = label_str
		label.color = new Color(0, 0, 0, 255)
		const renderInfo = LEVEL_RENDER_INFO[renderType]
		label.fontSize = renderInfo.fontSize
		label.font = this._font
		label.lineHeight = renderInfo.lineHeight
		label.enableWrapText = true
		label.overflow = Label.Overflow.SHRINK
		this.setUITransform(renderInfo, node)
		node.setParent(this.node)
	}

	setUITransform(element: any, node: Node) {
		// 设置首页元素UI显示相关的一些数据
		const transform = node.addComponent(UITransform)
		transform.setContentSize(element.width, element.height)
		node.layer = 1 << Layers.nameToLayer("UI_2D")
		node.setPosition(element.pos_x, element.pos_y)
	}

	async renderTrackPoint() {
		// 渲染铁轨上的点
		const spriteFrames = await loadRes("img/gamePoint")
		for (let index = 0; index < DataManager.Instance.levelInfo.pointInfo.length; index++) {
			const element = DataManager.Instance.levelInfo.pointInfo[index];
			const node = new Node()
			const sprite = node.addComponent(Sprite)
			sprite.spriteFrame = spriteFrames.find((item) => item.name == element.src)
			if (element.pointType === CHOISE_ENUM.CORNER) {
				DataManager.Instance.cornerTrackPoint = node
				sprite.color = new Color(255, 255, 255, 69)
			} else {
				DataManager.Instance.straightTrackPoint = node
			}
			this.setUITransform(element, node)
			node.setParent(this.node)
			this.addRigidBody(node)
			this.addCollider(node, [])
		}
	}
	changeTrackPoint() {
		if (DataManager.Instance.questionChoice === CHOISE_ENUM.CORNER) {
			DataManager.Instance.straightTrackPoint.getComponent(Sprite).color = new Color(255, 255, 255, 69)
			DataManager.Instance.cornerTrackPoint.getComponent(Sprite).color = new Color(255, 255, 255, 255)
		} else {
			DataManager.Instance.straightTrackPoint.getComponent(Sprite).color = new Color(255, 255, 255, 255)
			DataManager.Instance.cornerTrackPoint.getComponent(Sprite).color = new Color(255, 255, 255, 69)
		}
	}

	addRigidBody(node: Node) {
		console.log("add rigid body", node)
		const rigidBody = node.addComponent(RigidBody2D)
		rigidBody.type = ERigidBody2DType.Dynamic
		rigidBody.group = 0
		rigidBody.allowSleep = true
		rigidBody.awakeOnLoad = true
		rigidBody.gravityScale = 1
		rigidBody.enabledContactListener = true
		// const p = new Vec2(100, 100)
		// rigidBody.applyLinearImpulseToCenter(p, true) 

	}

	addCollider(node: Node, point: Array<Vec2>) {
		const boxCollider = node.addComponent(PolygonCollider2D)
		boxCollider.points = point
		boxCollider.threshold = 1
		boxCollider.group = 0
		boxCollider.density = 1
		boxCollider.friction = 0.2
		boxCollider.on(
			Contact2DType.BEGIN_CONTACT, (event) => {
				console.log('小汽车撞到篮球了！');
				// 给篮球施加一个向上的冲量
			    }, this
		)
	}

	/**
	 * const {ccclass, property} = cc._decorator;

@ccclass
export default class Knockout extends cc.Component {
    @property(cc.Vec2)
    force: cc.Vec2 = cc.v2(0, 0);

    onLoad() {
	// 获取物理引擎组件
	const physicsManager = cc.director.getPhysicsManager();
	// 开启物理引擎
	physicsManager.enabled = true;
	// 设置重力加速度
	physicsManager.gravity = cc.v2(0, -1000);
    }


    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
	// 获取刚体组件
	const rigidBody = other.node.getComponent(cc.RigidBody);
	if (rigidBody) {
	    // 施加力的方向为物品中心指向玩家位置
	    const direction = self.node.position.sub(other.node.position).normalize();
	    // 施加力
	    rigidBody.applyForceToCenter(this.force.mul(direction), true);
	}
    }
}
	 */

}
