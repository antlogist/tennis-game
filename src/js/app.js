const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
let ballX = 50;


window.onload = function() {

  const framesPerSecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

}

function moveEverything() {
  ballX = ballX + 5;
}

function drawEverything() {

  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 210, 10, 100);

  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(ballX, 200, 5, 5);
}
