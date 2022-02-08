export function rect(canvasContext, color, x, y, width, height) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

export function circle(canvasContext, color, x, y, radius) {
  canvasContext.beginPath();
  canvasContext.fillStyle = color;
  canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
