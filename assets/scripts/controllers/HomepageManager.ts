import { _decorator, Component, resources, SpriteFrame, Node, Sprite, UITransform, Layers, Button, EventHandler } from 'cc';
import { IPointInfoItem } from '../../data/d';
import homePageInfo from '../../data/homepage';
import { EVENT_ENUM, ITEM_TYPE_ENUM } from '../../enums';
import EventManger from '../../Runtime/EventManager';
const { ccclass } = _decorator;

@ccclass('HomepageManager')
export class HomepageManager extends Component {

    async show() {
        const spriteFrames = await this.loadRes()
        for (let i = 0; i < homePageInfo.length; i++) {
            const element = homePageInfo[i];
            const node = new Node()
            const sprite = node.addComponent(Sprite)
            sprite.spriteFrame = spriteFrames.find(v => v.name === element.src)
            // 设置组件位置，尺寸
            this.setUITransform(element, node)
            // 如果是按钮，则给按钮绑定相关事宜
            if (element.type === ITEM_TYPE_ENUM.BUTTON) {
                this.setButtonAttr(node, element.event)
            }
            node.setParent(this.node)
        }
    }


    setUITransform(element: IPointInfoItem, node: Node) {
        // 设置首页元素UI显示相关的一些数据
        const transform = node.addComponent(UITransform)
        transform.setContentSize(element.width, element.height)
        node.layer = 1 << Layers.nameToLayer("UI_2D")
        node.setPosition(element.pos_x, element.pos_y)
    }

    setButtonAttr(node: Node, event: EVENT_ENUM) {
        // 首页按钮属性相关
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "HomepageManager";// 这个是脚本类名
        clickEventHandler.handler = "handler"
        clickEventHandler.customEventData = event

        const button = node.addComponent(Button)
        button.transition = Button.Transition.SCALE
        button.zoomScale = 0.9
        button.clickEvents.push(clickEventHandler) 
    }

    handler() {
        EventManger.Instance.emit(EVENT_ENUM.START)
    }

    loadRes() {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir("img/homePage", SpriteFrame, function (err, assets) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(assets)
            })
        })
    }
}

