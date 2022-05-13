import {makeAutoObservable} from "mobx";

class PaintState {
  paint = null;

  constructor() {
    makeAutoObservable(this);
  };

  setPaint(paint) {
    this.paint = paint;
  };

  setFillColor(color) {
    this.paint.fillColor = color;
  };

  setStrokeColor(color) {
    this.paint.strokeColor = color;
  };

  setLineWidth(width) {
    this.paint.lineWidth = width;
  };
};

export default new PaintState();