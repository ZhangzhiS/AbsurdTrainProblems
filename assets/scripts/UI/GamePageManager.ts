import { _decorator, Component, resources, SpriteFrame, Node, Sprite, UITransform, Layers, Button, Label, Font, Color } from 'cc';
import { ILevel } from '../../data/d';
import levels from '../../data/index';
import senesInfo from '../../data/trackInfo';
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
	}
}


/* 
游戏页面场景管理

1. 轨道渲染

*/

@ccclass('GamePageManager')
export class GamePageManager extends Component {

	async show() {
		// 轨道渲染
		this.renderRail()
		// 游戏可变元素渲染
		this.renderGamePoint()
	}

	async renderRail() {
		const railFrames = await this.loadRes("img/gameSenes")
		for (let i = 0; i < senesInfo.length; i++) {
			const element = senesInfo[i];
			const node = new Node(element.point)
			const sprite = node.addComponent(Sprite)
			sprite.spriteFrame = railFrames.find(v => v.name === element.src)
			this.setUITransform(element, node)
			node.setParent(this.node)
		}
	}

	async renderGamePoint() {
		const pointFrames = await this.loadRes("img/gamePoint")
		const levelInfo = levels.level1
		this.renderLevelInfo(levelInfo)
	}

	renderLevelInfo(levelInfo: ILevel) {
		// this.renderQuestion(levelInfo.question)
		this.renderLabel(levelInfo.question, "question")
		this.renderLabel(levelInfo.tip, "tips")
		const levelTitle = "Level: " + levelInfo.levelNumber
		this.renderLabel(levelTitle, "level")
	}

	renderLabel(label_str: string, renderType: string) {
		const node = new Node(label_str)
		const label = node.addComponent(Label)
		label.string = label_str
		label.color = new Color(0, 0, 0, 255)
		const renderInfo = LEVEL_RENDER_INFO[renderType]
		label.fontSize = renderInfo.fontSize
		label.lineHeight = renderInfo.lineHeight
		label.enableWrapText = true
		label.overflow = Label.Overflow.SHRINK
		this.setUITransform(renderInfo, node)
		node.setParent(this.node)
	}

	renderLevelTitle(title: string) {
		const node = new Node("gameTitle")
		const label = node.addComponent(Label)
		label.string = title
		label.color = new Color(0, 0, 0, 255)
		label.fontSize = 80
		label.lineHeight = 80
		label.font = new Font("Muyao-Softbrush")
		const transform = node.addComponent(UITransform)
		transform.setContentSize(10, 10)
		node.layer = 1 << Layers.nameToLayer("UI_2D")
		node.setPosition(100, 600)
		node.setParent(this.node)
	}

	renderQuestion(question: string) {
		const node = new Node("gameQuestion")
                const label = node.addComponent(Label)
                label.string = question
                label.color = new Color(0, 0, 0, 255)
                label.fontSize = 40
                label.lineHeight = 40
                label.font = new Font("Muyao-Softbrush")
                const transform = node.addComponent(UITransform)
                transform.setContentSize(10, 10)
                node.layer = 1 << Layers.nameToLayer("UI_2D")
                node.setPosition(100, 600)
                node.setParent(this.node)
	}

	setUITransform(element: any, node: Node) {
		// 设置首页元素UI显示相关的一些数据
		const transform = node.addComponent(UITransform)
		transform.setContentSize(element.width, element.height)
		node.layer = 1 << Layers.nameToLayer("UI_2D")
		node.setPosition(element.pos_x, element.pos_y)
	}

	setButtonAttr(node: Node) {
		// 首页按钮属性相关
		const button = node.addComponent(Button)
		button.transition = Button.Transition.SCALE
		button.zoomScale = 0.9
	}

	loadRes(path: string) {
		return new Promise<SpriteFrame[]>((resolve, reject) => {
			resources.loadDir(path, SpriteFrame, function (err, assets) {
				if (err) {
					reject(err)
					return
				}
				resolve(assets)
			})
		})
	}
}

