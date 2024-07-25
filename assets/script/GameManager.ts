import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { MapControl } from './MapControl';
import { GameState } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager;

    @property(Prefab)
    mapPrefab: Prefab;

    gameState: GameState;
    map: Node = null;
    mapControl: MapControl;

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
        this.instantiateMap();
    }

    replay() {
        this.instantiateMap();
    }
    instantiateMap() {
        this.gameState = GameState.GAME_ON;
        if (this.map) this.map.destroy();
        this.map = instantiate(this.mapPrefab);
        this.node.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);
    }
}


