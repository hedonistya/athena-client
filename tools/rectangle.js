import Tool from "./tool";

class Rectangle extends Tool {
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
    this.saved = this.board.toDataURL()
  };

  mouseUpHandler(e) {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'rectangle',
        x: this.positionX,
        y: this.positionY,
        width: this.width,
        height: this.height,
        color: this.ctx.fillStyle
      }
    }))
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentPositionX = e.pageX - e.target.offsetLeft;
      let currentPositionY = e.pageY - e.target.offsetTop;

      this.width = currentPositionX - this.positionX;
      this.height = currentPositionY - this.positionY;

      this.paint(this.positionX, this.positionY, this.width, this.height);
    }
  };

  paint(x, y, width, height) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      this.ctx.drawImage(img, 0, 0, this.board.width, this.board.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fill();
      this.ctx.stroke();
    }
  };

  static staticPaint(ctx, x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
  }
}

export default Rectangle;