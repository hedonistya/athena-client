import Tool from "./tool";
import {paintState} from "../store";

class Eraser extends Tool {
  constructor(board, socket, id) {
    super(board, socket, id);
    this.listen();
  };

  listen() {
    this.board.onmousedown = this.mouseDownListener.bind(this);
    this.board.onmouseup = this.mouseUpListener.bind(this);
    this.board.onmousemove = this.mouseMoveListener.bind(this);
  };

  // check mouse down
  mouseDownListener(event) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
  };

  // check mouse up
  mouseUpListener() {
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      }
    }));
  };

  // check mouse move
  mouseMoveListener(event) {
    if (this.mouseDown) {
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'eraser',
          x: event.pageX - event.target.offsetLeft,
          y: event.pageY - event.target.offsetTop,
          lineWidth: paintState.strokeWidth
        }
      }));
    }
  };

  // draw line server
  static eraserPaint(ctx, x, y, lineWidth) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };
}

export default Eraser;