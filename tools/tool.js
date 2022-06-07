class Tool {
  constructor(board, socket, id) {
    this.board = board;
    this.socket = socket;
    this.id = id;
    this.ctx = board.getContext('2d');
    this.resetEvents();
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