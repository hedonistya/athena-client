import Tool from "./tool";
import {paintState} from "../store";

class Brush extends Tool {
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
          type: 'brush',
          x: event.pageX - event.target.offsetLeft,
          y: event.pageY - event.target.offsetTop,
          color: paintState.stroke,
          lineWidth: paintState.strokeWidth
        }
      }));
      this.paint(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
    }
  };

  // draw line client
  paint(x, y) {
    const img = new Image();
    this.ctx.strokeStyle = paintState.stroke;
    this.ctx.lineWidth = paintState.strokeWidth;

    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      this.ctx.drawImage(img, 0, 0, this.board.width, this.board.height);
      this.ctx.beginPath();
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }

  // draw line server
  static staticPaint(ctx, x, y, color, lineWidth) {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
  };
}

export default Brush;