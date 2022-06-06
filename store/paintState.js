import {makeAutoObservable} from "mobx";

class PaintState {
  paint = null;
  fill = '#000';
  stroke = '#000';
  strokeWidth = 1;
  figureColor = true;

  constructor() {
    makeAutoObservable(this);
  };

  setPaint(paint) {
    this.paint = paint;
  };

  setFillColor(color) {
    this.fill = color;
  };

  setStrokeColor(color) {
    this.stroke = color;
  };

  setStrokeWidth(width) {
    this.strokeWidth = width;
  };

  setFigureColor(figureColor) {
    this.figureColor = figureColor;
  }
};

export default new PaintState();