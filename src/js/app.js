const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

let ballX = 50;
let ballSpeedX = 10;

let ballY = 50;
let ballSpeedY = 2;

let playerOneScore = 0;
let playerTwoScore = 0;
const winningScore = 3;

let paddleOneY = 250;
let paddleTwoY = 250;
const paddleHeight = 100;
const paddleThickness = 10;

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

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement() {

  const paddleTwoYCenter = paddleTwoY + (paddleHeight/2);

  if(paddleTwoYCenter < ballY-25) {
    paddleTwoY += 6;
  } else if(paddleTwoYCenter > ballY+25) {
    paddleTwoY -= 6;
  }
}

function moveEverything() {

  computerMovement();

  ballX += ballSpeedX;
  ballY +=  ballSpeedY;

  if(ballX >= canvas.width) {
    if(ballY > paddleTwoY &&
      ballY < paddleTwoY + paddleHeight) {
      ballSpeedX = -ballSpeedX;

       const deltaY = ballY - (paddleOneY + paddleHeight / 2);
       ballSpeedY = deltaY*0.025;
   } else {
     ballReset();
     playerOneScore++;
   }
  } else if (ballX <= 0) {
    if(ballY > paddleOneY &&
       ballY < paddleOneY + paddleHeight) {
       ballSpeedX = -ballSpeedX;

        const deltaY = ballY - (paddleTwoY + paddleHeight / 2);
        ballSpeedY = deltaY*0.025;
    } else {
      ballReset();
      playerTwoScore++;
    }
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
  colorRect(0, paddleOneY, paddleThickness, paddleHeight, 'white');

  //right player paddle
  colorRect(canvas.width - paddleThickness, paddleTwoY, paddleThickness, paddleHeight, 'white');

  //ball
  colorCircle(ballX, ballY, 10, 'white');

  //players score
  canvasContext.fillText(playerOneScore, 100, 100);
  canvasContext.fillText(playerTwoScore, canvas.width-100, 100);
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
