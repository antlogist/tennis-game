const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

let ballX = 50;
let ballSpeedX = 15;

let ballY = 50;
let ballSpeedY = 5;

let paddleOneY = 250;
const paddleHeight = 100;

function calculateMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseX = evt.clientX - rect.left - root.scrollLeft;
  const mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = function() {

  const framesPerSecond = 60;

  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove', function(evt) {
    const mousePos = calculateMousePos(evt);
    paddleOneY = mousePos.y - paddleHeight/2;
  });

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
  colorRect(0, paddleOneY, 10, paddleHeight, 'white');

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
