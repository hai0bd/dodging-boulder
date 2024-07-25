import { _decorator, Button, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupControl')
export class PopupControl extends Component {
    @property(Button)
    buttonWin: Button;

    @property(Button)
    buttonLose: Button;

    start() {
        this.buttonWin.node.on(Button.EventType.CLICK, this.onWinClick, this);
        this.buttonLose.node.on(Button.EventType.CLICK, this.onLoseClick, this);
    }

    onWinClick() {
        this.buttonWin.node.active = false;
        GameManager.instance.replay();
    }
    onLoseClick() {
        this.buttonLose.node.active = false;
        GameManager.instance.replay();
    }
}


