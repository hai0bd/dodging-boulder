import { _decorator, CCFloat, Component, EventKeyboard, EventTouch, Input, input, KeyCode, SphereCollider, Vec2, Vec3 } from 'cc';
import { GameState, Layer } from './Enum';
import { GameManager } from './GameManager';
import { instance, JoystickDataType } from '../joystick/Joystick';
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
        instance.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    onDisable() {
        input.off(Input.EventType.KEY_DOWN);
        input.off(Input.EventType.KEY_PRESSING);
        input.off(Input.EventType.KEY_UP);
    }
    onTouchMove(event: EventTouch, data: JoystickDataType) {
        const moveDir = data.moveVec;
        console.log(moveDir);
        this.direction = new Vec2(moveDir.x, moveDir.y);
    }
    onTouchEnd(event: EventTouch, data: JoystickDataType) {
        this.direction = Vec2.ZERO;
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