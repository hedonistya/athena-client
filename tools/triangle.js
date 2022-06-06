import Tool from "./tool";
import boardState from "../store/boardState";
import {paintState} from "../store";

class Triangle extends Tool {
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
    this.positionX = event.pageX - event.target.offsetLeft;
    this.positionY = event.pageY - event.target.offsetTop;
    this.ctx.beginPath();
    this.saved = this.board.toDataURL();
  };

  // check mouse up
  mouseUpListener() {
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'triangle',
        x: this.positionX,
        y: this.positionY,
        x2: this.x2,
        y2: this.y2,
        x3: this.x3,
        y3: this.y3,
        color: paintState.fill,
        strokeColor: paintState.stroke,
        strokeWidth: paintState.strokeWidth,
        fillColor: paintState.figureColor
      }
    }));
  };

  // check mouse move
  mouseMoveListener(event) {
    if (this.mouseDown) {
      let currentPositionX = event.pageX - event.target.offsetLeft;
      let currentPositionY = event.pageY - event.target.offsetTop;
      this.x2 = currentPositionX;
      this.y2 = currentPositionY + 16;
      this.x3 = this.positionX - this.x2 + this.positionX;
      this.y3 = currentPositionY + 16;
      this.paint(this.positionX, this.positionY, this.x2, this.y2, this.x3, this.y3);
    }
  };

  // draw line client
  paint(x, y, x2, y2, x3, y3) {
    const img = new Image();
    this.ctx.fillStyle = paintState.fill;
    this.ctx.strokeStyle = paintState.stroke;
    this.ctx.lineWidth = paintState.strokeWidth;

    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      this.ctx.drawImage(img, 0, 0, this.board.width, this.board.height);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.closePath();
      this.ctx.stroke();

      if (paintState.figureColor){
        this.ctx.fill();
      }
    }
  };

  // draw line server
  static staticPaint(ctx, x, y, x2, y2, x3, y3, color, strokeColor, strokeWidth, fillColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();

    if (fillColor){
      ctx.fill();
    }
  };
}

export default Triangle;