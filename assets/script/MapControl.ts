import { _decorator, Button, Component, ICollisionEvent, Node, SphereCollider } from 'cc';
import { GameState, Layer } from './Enum';
import { CameraShake } from './CameraShake';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {
    @property(SphereCollider)
    playerCollider: SphereCollider;

    @property(Node)
    buttonDeath: Node

    @property(CameraShake)
    cameraShake: CameraShake;

    start() {
        this.playerCollider.on('onCollisionEnter', this.onCollisionEnter, this);
    }
    onDisable(){
        this.playerCollider.off('onCollisionEnter');
    }

    onCollisionEnter(event: ICollisionEvent) {
        const other = event.otherCollider;
        if (other.node.layer == Layer.Death_Point) {
            GameManager.instance.gameState = GameState.GAME_OFF;

            this.cameraShake.init(); // rung lắc
            this.scheduleOnce(() => { this.buttonDeath.active = true; }, 0.3)
        }
    }
}


