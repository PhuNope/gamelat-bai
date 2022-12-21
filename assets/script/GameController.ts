import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from "cc";
import { Card } from "./gameObject/Card";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property(Prefab)
  cardPrefab: Prefab;

  @property(Node)
  groupCard: Node;

  NUM_OF_COL = 5;
  NUM_OF_ROW = 2;
  CARD_WITH = 110;
  CARD_HEIGHT = 130;

  start() {
    for (let i = 0; i < this.NUM_OF_COL; i++) {
      for (let j = 0; j < this.NUM_OF_ROW; j++) {
        let card = instantiate(this.cardPrefab);

        card.getComponent(Card).setup();

        let x = -250 + i * (this.CARD_WITH + 10);
        let y = 0 + j * (this.CARD_HEIGHT + 10);

        card.setPosition(new Vec3(x, y, 0));
        this.groupCard.addChild(card);
      }
    }
  }

  update(deltaTime: number) {}
}
