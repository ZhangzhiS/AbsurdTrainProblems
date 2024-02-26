import { _decorator, Component, Node, PhysicsSystem2D, PHYSICS_2D_PTM_RATIO, v2, EPhysics2DDrawFlags, director } from 'cc';
import { HomepageManager } from './controllers/HomepageManager';
import { createUINode } from './utils';
import { GamePageManager } from './UI/GamePageManager';
import DataManager from '../Runtime/DateManager';
import EventManger from '../Runtime/EventManager';
import { EVENT_ENUM } from '../enums';
import QuestionManager from './controllers/questionManager';
import levels from '../data';
import { TrackManager } from './controllers/trackManager';
import { SwitchManager } from './controllers/switchManager';
import { TrainManager } from './controllers/trainManager';
const { ccclass } = _decorator;

@ccclass('Main')
export class Main extends Component {

    private debug: boolean = true;

    onLoad() {
        PhysicsSystem2D.instance.enable = true
        // PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);
        if (this.debug) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All
        } else {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None
        }
    }

    start() {
        this.generateHomePageNode()
        this.generateQuestionsNode()
        this.initHomePage()
    }

    generateHomePageNode() {
        DataManager.Instance.stage = createUINode();
        DataManager.Instance.stage.setParent(this.node)
    }

    generateQuestionsNode() {
        DataManager.Instance.question = createUINode();
        DataManager.Instance.question.setParent(this.node)
    }

    initHomePage() {
        // 初始化游戏首页
        const node = createUINode()
        node.setParent(DataManager.Instance.stage)
        const homepageManager = node.addComponent(HomepageManager)
        homepageManager.show()
        EventManger.Instance.on(EVENT_ENUM.START, this.hideHomePage)
        EventManger.Instance.on(EVENT_ENUM.START, this.initLevel)
    }

    hideHomePage() {
        // 开始游戏之后隐藏首页元素
        DataManager.Instance.stage.destroyAllChildren()
    }

    initLevel() {
        // 初始化关卡
        // this.generateQuestionsNode()
        DataManager.Instance.levelIndex = 1
        DataManager.Instance.levelInfo = levels["level"+DataManager.Instance.levelIndex]
        // 渲染铁轨
        const track_node = createUINode("track")
        track_node.setParent(DataManager.Instance.stage)
        const trackManager = track_node.addComponent(TrackManager)
        trackManager.init()
        EventManger.Instance.on(EVENT_ENUM.CHOISE_DIRECTION, DataManager.Instance.track.changeTrackRender)
        // 渲染选择按钮
        const button_node = createUINode("button")
        button_node.setParent(DataManager.Instance.stage)
        const buttonManager = button_node.addComponent(SwitchManager)
        buttonManager.init()
        EventManger.Instance.on(EVENT_ENUM.CHOISE_DIRECTION, DataManager.Instance.switchManager.changeSwitch)

        // 渲染火车
        const train_node = createUINode("train")
        train_node.setParent(DataManager.Instance.stage)
        const trainManager = train_node.addComponent(TrainManager)
        trainManager.init()

    
        //渲染题目文本
        const question_node = createUINode()
        question_node.setParent(DataManager.Instance.question)
        const questionManager = question_node.addComponent(QuestionManager)
        questionManager.init()
    }

    startGame() {
        // 渲染游戏标题
        const node = createUINode()
        node.setParent(this.node)
        const gamePageManager = node.addComponent(GamePageManager)
        gamePageManager.show()
    }

    showGamePage() {
        const node = createUINode()
        node.setParent(this.node)
        const gamePageManager = node.addComponent(GamePageManager)
        gamePageManager.show()
    }
}


