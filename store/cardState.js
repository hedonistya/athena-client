import {makeAutoObservable} from "mobx";

class CardState {
  card = [];
  cardResult = [];
  filterCard = [];
  cardImage = [];

  constructor() {
    makeAutoObservable(this);
  };

  setCard(card) {
    this.card = card;
  };

  setCardResult(cardResult) {
    this.cardResult = cardResult;
  };

  setFilterCard(filterCard) {
    this.filterCard = filterCard;
  };

  setCardImage(cardImage) {
    this.cardImage = cardImage;
  }
}

export default new CardState();