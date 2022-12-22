import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from "cc";
import { Card } from './gameObject/Card';
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
  CARD_TYPE_LIST: number[] = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  cardList: Node[] = [];

  oldCard: Card
  start() {
    let count = 0;

    for (let i = 0; i < this.NUM_OF_COL; i++) {
      for (let j = 0; j < this.NUM_OF_ROW; j++) {
        let card = instantiate(this.cardPrefab);

        //gan id card
        let cardType = this.CARD_TYPE_LIST[count];
        count++;

        card.getComponent(Card).setup(cardType, (card: Card) => {
          this.onTouchCard(card)
        });

        let x = -250 + i * (this.CARD_WITH + 10);
        let y = 0 + j * (this.CARD_HEIGHT + 10);

        card.setPosition(new Vec3(x, y, 0));
        this.groupCard.addChild(card);
        this.cardList.push(card);
      }
    }
  }

  private onTouchCard(card: Card) {
    //dong card da mo
    if (this.oldCard == card) {
      card.handleCloseCard();
      this.oldCard = null;
    }
    //chon card khac
    else {
      card.handleUpCard(() => {
        if (this.oldCard == null) {
          this.oldCard = card;
        } else {
          if (this.oldCard.cardType == card.cardType) {
            let removeIndex1 = this.cardList.findIndex(item => item === this.oldCard.node);
            this.cardList.splice(removeIndex1, 1);
            this.oldCard.node.destroy();
            let removeIndex = this.cardList.findIndex(item => item === card.node);
            this.cardList.splice(removeIndex, 1);
            card.node.destroy();
            this.oldCard = null;
            console.log(this.cardList)
          }
          else {
            this.oldCard.handleCloseCard(() => {
              this.oldCard = null;
            });
            card.handleCloseCard();
          }
        }
      });
    }

  }
  update(deltaTime: number) { }
}
