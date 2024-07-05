import { _decorator, Component, Node } from 'cc';
import { MapControl } from './MapControl';
import { GameState } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager;

    @property(MapControl)
    map: MapControl;

    gameState: GameState;

    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this;
        } else {
            this.destroy();
        }
    }
}


