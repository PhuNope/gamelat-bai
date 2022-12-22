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

  cardType;
  callBack;

  start() {
    //add su kien click
    this.node.on(Node.EventType.TOUCH_START, this.onTouchCard, this);
  }

  //su kien click
  onTouchCard() {
    this.callBack(this);

  }

  update(deltaTime: number) { }

  setup(cardType, callBack) {
    //dat id cho card
    //truyen nhuwng chua su dung
    this.cardType = cardType;
    //truyen nhuwng chua su dung
    this.callBack = callBack;

    //up khi setup
    this.cardSpire.spriteFrame = this.cardSpireFrame[0];
  }

  handleCloseCard(finishCallBack = null) {
    let cardParent = this.cardSpire.node;

    tween(cardParent)
      .sequence(
        tween(cardParent).to(0.2, { scale: new Vec3(0, 1, 0) }),

        tween(cardParent).call(() => {
          this.cardSpire.spriteFrame = this.cardSpireFrame[0];
        }),

        tween(cardParent).to(0.2, { scale: new Vec3(1, 1, 1) }),

        tween(cardParent).delay(0.2),

        tween(cardParent).call(() => {
          finishCallBack ? finishCallBack() : null;
        })
      )
      .start();
  }

  handleUpCard(finishCallBack) {
    let cardParent = this.cardSpire.node;

    tween(cardParent).sequence(
      tween(cardParent).to(0.2, { scale: new Vec3(0, 1, 0) }),

      tween(cardParent).call(() => {
        this.cardSpire.spriteFrame = this.cardSpireFrame[this.cardType];
      }),

      tween(cardParent).to(0.2, { scale: new Vec3(1, 1, 1) }),

      tween(cardParent).delay(0.2),

      tween(cardParent).call(() => {
        finishCallBack();
      })
    ).start();
  }
}
