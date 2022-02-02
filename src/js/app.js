const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
let ballX = 50;
let ballSpeedX = 15;


window.onload = function() {

  const framesPerSecond = 30;

  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

}

function moveEverything() {
  ballX = ballX + ballSpeedX;

  if(ballX >= canvas.width) {
    ballSpeedX = -ballSpeedX
  } else if (ballX <= 0) {
    ballSpeedX = -ballSpeedX;
  }
}

function drawEverything() {

  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 210, 10, 100);

  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(ballX, 200, 5, 5);
}
