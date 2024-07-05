import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CustomRandom')
export class CustomRandom extends Component {
    // Hàm random2
    random2(st: Vec2): number {
        st = new Vec2(Vec2.dot(st, new Vec2(127.1, 311.7)),
            Vec2.dot(st, new Vec2(269.5, 183.3)));


        return -1.0 + 2.0 * this.fract(Math.sin(Vec2.dot(st, new Vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // Hàm noise
    noise(st: Vec2): number {
        let i = new Vec2(Math.floor(st.x), Math.floor(st.y));
        let f = new Vec2(this.fract(st.x), this.fract(st.y));

        let u = new Vec2(f.x * f.x * (3.0 - 2.0 * f.x), f.y * f.y * (3.0 - 2.0 * f.y)); // Hàm cubic, làm mượt

        return this.mix(this.mix(this.random2(i.add(new Vec2(0.0, 0.0))),
            this.random2(i.add(new Vec2(1.0, 0.0))), u.x),
            this.mix(this.random2(i.add(new Vec2(0.0, 1.0))),
                this.random2(i.add(new Vec2(1.0, 1.0))), u.x), u.y);
    }
    // Hàm fract
    fract(x: number): number {
        return x - Math.floor(x);
    }

    // Hàm mix
    mix(x: number, y: number, a: number): number {
        return x * (1.0 - a) + y * a;
    }
}


