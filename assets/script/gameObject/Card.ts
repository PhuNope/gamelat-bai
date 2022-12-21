import {
  _decorator,
  Component,
  Node,
  Sprite,
  SpriteFrame,
  tween,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Card")
export class Card extends Component {
  @property(SpriteFrame)
  cardSpireFrame: SpriteFrame[] = [];

  @property(Sprite)
  cardSpire: Sprite;

  start() {}

  update(deltaTime: number) {}

  setup() {
    this.cardSpire.spriteFrame = this.cardSpireFrame[0];
  }

  handleCloseCard() {
    let cardParent = this.cardSpire.node;
    tween(cardParent)
      .sequence(
        tween(cardParent).to(0.2, { scale: new Vec3(0, 1, 0) }),

        tween(cardParent).call(() => {
          this.cardSpire.spriteFrame = this.cardSpireFrame[0];
        }),

        tween(cardParent).to(0.2, { scale: new Vec3(1, 1, 1) }),

        tween(cardParent).delay(0.2)
      )
      .start();
  }
}
