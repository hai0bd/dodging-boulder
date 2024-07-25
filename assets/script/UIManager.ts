import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { MapControl } from './MapControl';
import { GameState } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    private static _instance: UIManager;
    public static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager;
        }
        return this._instance;
    }

    @property(Node)
    winPopup: Node;

    @property(Node)
    losePopup: Node

    onLoad() {
        if (!UIManager._instance) {
            UIManager._instance = this;
        } else {
            this.destroy();
        }
    }

    lose() {
        this.losePopup.active = true;
    }

    win(){
        this.winPopup.active = true;
    }
}


