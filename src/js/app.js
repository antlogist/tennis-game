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
  //black screen of playing field
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  //left player paddle
  colorRect(0, 210, 10, 100, 'white');

  //ball
  colorRect(ballX, 200, 5, 5, 'red');
}

function colorRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}
