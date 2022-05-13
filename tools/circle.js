import Tool from "./tool";

class Circle extends Tool {
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
    this.mouseDown = false;
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'circle',
        x: this.positionX,
        y: this.positionY,
        radius: this.radius,
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

      this.radius = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2))
      this.paint(this.positionX, this.positionY, this.radius);
    }
  };

  paint(x, y, radius) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      this.ctx.drawImage(img, 0, 0, this.board.width, this.board.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    }
  };

  static staticPaint(ctx, x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke()
  }
}

export default Circle;