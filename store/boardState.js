import {makeAutoObservable} from "mobx";

class BoardState {
  board = null;
  sessionId = null;
  socket = null;
  undoHistory = [];
  redoHistory = [];

  constructor() {
    makeAutoObservable(this);
  };

  setBoard(board) {
    this.board = board;
  };

  setSessionId(id) {
    this.sessionId = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  undo() {
    let ctx = this.board.getContext('2d')
    if (this.undoHistory.length > 0) {
      let dataUrl = this.undoHistory.pop()
      this.redoHistory.push(this.board.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.board.width, this.board.height)
        ctx.drawImage(img, 0, 0, this.board.width, this.board.height)
      }
    } else {
      ctx.clearRect(0, 0, this.board.width, this.board.height)
    }
  };

  redo() {
    let ctx = this.board.getContext('2d')
    if (this.redoHistory.length > 0) {
      let dataUrl = this.redoHistory.pop()
      this.undoHistory.push(this.board.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.board.width, this.board.height)
        ctx.drawImage(img, 0, 0, this.board.width, this.board.height)
      }
    }
  }

  clickUndo(data) {
    this.undoHistory.push(data);
  };

  clickRedo(data) {
    this.redoHistory.push(data);
  };

};

export default new BoardState();