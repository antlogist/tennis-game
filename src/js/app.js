const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

window.onload = function() {
  drawEverything();
}

function drawEverything() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}
