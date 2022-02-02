const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

let ballX = 50;
let ballSpeedX = 15;

let ballY = 50;
let ballSpeedY = 5;


window.onload = function() {

  const framesPerSecond = 60;

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

  ballY = ballY + ballSpeedY;

  if(ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY
  } else if (ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

}

function drawEverything() {
  //black screen of playing field
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  //left player paddle
  colorRect(0, 210, 10, 100, 'white');

  //ball
  colorCircle(ballX, ballY, 10, 'white');
}

function colorRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
