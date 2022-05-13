import Tool from "./tool";

class Triangle extends Tool {
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

    this.positionX = e.pageX - e.target.offsetLeft;
    this.positionY = e.pageY - e.target.offsetTop;

    this.ctx.beginPath();
    this.ctx.moveTo(this.positionX, this.positionY);
    this.saved = this.board.toDataURL();

  };

  mouseUpHandler(e) {
    this.mouseDown = false;
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentPositionX = e.pageX - e.target.offsetLeft;
      let currentPositionY = e.pageY - e.target.offsetTop;

      this.x2 = currentPositionX;
      this.y2 = currentPositionY + 16;
      this.x3 = this.positionX - this.x2 + this.positionX;
      this.y3 = currentPositionY + 16;

      this.paint(this.positionX, this.positionY, this.x2, this.y2, this.x3, this.y3);
    }
  };

  paint(x, y, x2, y2, x3, y3) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      this.ctx.drawImage(img, 0, 0, this.board.width, this.board.height);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }
  };

  static staticPaint(ctx, x, y, x2, y2, x3, y3, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
}


export default Triangle;