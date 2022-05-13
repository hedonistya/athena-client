class Tool {
  constructor(board, socket, id) {
    this.board = board;
    this.socket = socket;
    this.id = id;
    this.ctx = board.getContext('2d');
    this.resetEvents();
  };

  set fillColor(color) {
    this.ctx.fillStyle = color;
  };

  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  };

  set lineWidth(color) {
    this.ctx.lineWidth = color;
  };

  resetEvents() {
    this.board.onmousedown = null;
    this.board.onmouseup = null;
    this.board.onmousemove = null;
  };
}

export default Tool;