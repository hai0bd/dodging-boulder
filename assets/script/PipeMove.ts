import { _decorator, CCFloat, Component, instantiate, math, Node, Prefab, Quat, Vec2, Vec3 } from 'cc';
import { GameState } from './Enum';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('PipeMove')
export class PipeMove extends Component {
    @property(Node)
    target: Node;

    @property(CCFloat)
    speed: number = 1;

    @property(CCFloat)
    limitZ: number = 9.5 + 9.5 / 2;

    @property(Prefab)
    boulderPrefab: Prefab;

    boulder: Node = null;

    update(deltaTime: number) {
        if (GameManager.instance.gameState == GameState.GAME_OFF) return;
        this.speed += deltaTime; // tốc độ tăng dần theo từng frame

        const pos = this.node.getPosition();
        pos.z += (this.speed * deltaTime); // di chuyển ống lùi về sau

        //nếu ống đi qua player thì cho lên đầu
        if (pos.z > this.target.position.z + 3.9) {
            // xóa boulder đã có và sinh boulder mới ở vị trí khác
            if (this.boulder) {
                this.boulder.destroy();
            }
            this.createBoulder();
            this.node.addChild(this.boulder);
            pos.z -= 3.9 * 7;
        }
        this.node.setPosition(pos);
    }

    createBoulder() {
        this.boulder = instantiate(this.boulderPrefab);
        this.boulder.children[0].setPosition(new Vec3(0, 0, Math.random() * 0.5 + 0.2));

        let rotation = this.boulder.rotation;
        Quat.fromEuler(rotation, 0, math.randomRange(0, 360), 0);
    }
}


