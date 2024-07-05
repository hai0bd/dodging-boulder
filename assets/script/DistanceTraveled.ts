import { _decorator, CCFloat, CCInteger, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
import { GameState } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('DistanceTraveled')
export class DistanceTraveled extends Component {
    @property(Label)
    meter: Label;

    @property(CCFloat)
    speed: number;

    @property(Node)
    buttonWin: Node;

    @property(CCInteger)
    maxMeter: number;

    distanceMeter: number = 0;

    update(deltaTime: number) {
        if (GameManager.instance.gameState == GameState.GAME_OFF) return;
        // console.log(deltaTime);
        this.distanceMeter += Math.floor(deltaTime * this.speed * 10); // tính quãng đường đã đi được
        this.meter.string = this.distanceMeter.toString() + " m";
        
        if (this.distanceMeter >= this.maxMeter) { //nếu đi được bằng maxMetter thì win
            this.buttonWin.active = true;
        }
    }
}


