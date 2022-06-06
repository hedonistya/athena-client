import Tool from "./tool";
import boardState from "../store/boardState";
import {paintState} from "../store";

class Circle extends Tool {
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
        type: 'circle',
        x: this.positionX,
        y: this.positionY,
        width: this.width,
        height: this.height,
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
      this.width = currentPositionX - this.positionX;
      this.height = currentPositionY - this.positionY;
      this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
      this.paint(this.positionX, this.positionY, this.radius);
    }
  };

  // draw line client
  paint(x, y, radius) {
    const img = new Image();
    this.ctx.fillStyle = paintState.fill;
    this.ctx.strokeStyle = paintState.stroke;
    this.ctx.lineWidth = paintState.strokeWidth;

    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      this.ctx.drawImage(img, 0, 0, this.board.width, this.board.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.stroke();

      if (paintState.figureColor){
        this.ctx.fill();
      }
    }
  };

  // draw line server
  static staticPaint(ctx, x, y, width, height, color, strokeColor, strokeWidth, fillColor) {
    let radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    ctx.fillStyle = color;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    if (fillColor){
      ctx.fill();
    }
  }
}

export default Circle;