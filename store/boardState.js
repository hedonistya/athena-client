import {makeAutoObservable} from "mobx";

class BoardState {
  board = null;
  sessionId = null;
  socket = null;

  constructor() {
    makeAutoObservable(this);
  }

  setBoard(board) {
    this.board = board;
  };

  setSessionId(id) {
    this.sessionId = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  clearCanvas() {
    let ctx = this.board.getContext('2d');
    ctx.clearRect(0, 0, this.board.width, this.board.height);
  };
};

export default new BoardState();