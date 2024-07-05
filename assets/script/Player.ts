import { _decorator, CCFloat, Component, Enum, EventKeyboard, ICollisionEvent, Input, input, KeyCode, Node, SphereCollider, Vec2, Vec3 } from 'cc';
import { GameState, Layer } from './Enum';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(SphereCollider)
    collider: SphereCollider;

    @property(CCFloat)
    speed: number = 1;

    @property(CCFloat)
    limitDistance: number = 1.25;

    direction: Vec2 = new Vec2();

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(event: EventKeyboard) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.direction.y = 1;
                break;
            case KeyCode.KEY_S:
                this.direction.y = -1;
                break;
            case KeyCode.KEY_A:
                this.direction.x = -1;
                break;
            case KeyCode.KEY_D:
                this.direction.x = 1;
                break;
        }
    }
    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.direction.y = 0;
                break;
            case KeyCode.KEY_S:
                this.direction.y = 0;
                break;
            case KeyCode.KEY_A:
                this.direction.x = 0;
                break;
            case KeyCode.KEY_D:
                this.direction.x = 0;
                break;
        }
    }

    update(deltaTime: number) {
        if (GameManager.instance.gameState == GameState.GAME_OFF) return;
        let pos = this.node.getPosition();

        pos.x += this.direction.x * this.speed * deltaTime;
        pos.y += this.direction.y * this.speed * deltaTime;

        if (Vec3.distance(pos, Vec3.ZERO) > this.limitDistance) pos = this.node.getPosition();
        else this.node.setPosition(pos);
    }

}