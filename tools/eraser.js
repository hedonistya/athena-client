import Brush from "./brush";
import Tool from "./tool";

class Eraser extends Tool {
  constructor(board, socket, id) {
    super(board, socket, id);
    this.listen();
  };

  listen() {
    this.board.onmousedown = this.mouseDownHandler.bind(this);
    this.board.onmouseup = this.mouseUpHandler.bind(this);
    this.board.onmousemove = this.mouseMoveHandler.bind(this);
  };

  mouseDownHandler(e) {
    this.mouseDown = true;

    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  };

  mouseUpHandler(e) {
    this.mouseDown = false;

    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      }
    }))
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'eraser',
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop
        }
      }))
    }
  };
  static eraserPaint(ctx, x, y) {
    ctx.strokeStyle = "#fff";
    ctx.lineTo(x, y);
    ctx.stroke();
  };
}

export default Eraser;