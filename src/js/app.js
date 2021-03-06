let canvas;
let canvasContext;

let ballX = 50;
let ballSpeedX = 10;

let ballY = 50;
let ballSpeedY = 2;

let playerLeftScore = 0;
let playerRightScore = 0;
const winningScore = 3;
let showingWinScreen = false;

let paddleLeftY = 250;
let paddleRightY = 250;
const paddleHeight = 100;
const paddleThickness = 10;

function calculateMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  // const mouseX = evt.clientX - rect.left - root.scrollLeft;
  // const mouseY = evt.clientY - rect.top - root.scrollTop;

  const mouseX = evt.clientX - rect.left;
  const mouseY = evt.clientY - rect.top;

  return {
    x: mouseX,
    y: mouseY
  };
}

function handleMouseClick(evt) {
  if(showingWinScreen) {
    playerLeftScore = 0;
    playerRightScore = 0;
    showingWinScreen = false;
  }
}

window.onload = function() {

  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;

  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', function(evt) {
    const mousePos = calculateMousePos(evt);
    paddleLeftY = mousePos.y - paddleHeight/2;
  });

}

function ballReset() {
  if(playerLeftScore >= winningScore ||
    playerRightScore >= winningScore) {
      showingWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement() {

  const paddleRightYCenter = paddleRightY + (paddleHeight/2);

  if(paddleRightYCenter < ballY-35) {
    paddleRightY += 6;
  } else if(paddleRightYCenter > ballY+35) {
    paddleRightY -= 6;
  }
}

function moveEverything() {

  if(showingWinScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;
  ballY +=  ballSpeedY;

  if(ballX >= canvas.width) {

    //right paddle (computer)
    if(ballY > paddleRightY &&
      ballY < paddleRightY + paddleHeight) {
      ballSpeedX = -ballSpeedX;

      const deltaY = ballY - (paddleRightY + paddleHeight/2);
      ballSpeedY = deltaY*0.05;
    } else {
      playerLeftScore++;
      ballReset();
    }

  } else if (ballX <= 0) {

    //left paddle
    if(ballY > paddleLeftY &&
       ballY < paddleLeftY + paddleHeight) {
       ballSpeedX = -ballSpeedX;

       //paddle center coordinates = paddleRightY + paddleHeight/2

       //paddleLeftY + paddleHeight / 2 = 172 + 100 / 2 = 222
       //167 - 222 = -55
       //Ball is moving up. It hit above the paddle center

       //paddleLeftY + paddleHeight / 2 = 364 + 100 / 2 = 414
       //435 - 414 = 21
       //Ball is moving down. It hit below the paddle center

        const deltaY = ballY - (paddleLeftY + paddleHeight/2);
        ballSpeedY = deltaY*0.05;
    } else {
      playerRightScore++;
      ballReset();
    }

  }

  ballY = ballY + ballSpeedY;

  //Change vertical direction
  if(ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY
  } else if (ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

}

function drawNet() {
  for(let i=0; i < canvas.clientHeight; i +=40) {
    colorRect(canvas.width / 2 - 1, i,
              2, 20, 'white');
  }
}

function drawEverything() {
  //black screen of playing field
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  if(showingWinScreen) {

    canvasContext.fillStyle = 'white';

    if(playerLeftScore >= winningScore) {
      canvasContext.fillText("Left Player Won!", 350, 200);
    }

    if(playerRightScore >= winningScore) {
      canvasContext.fillText("Right Player Won!", 350, 200);
    }

    canvasContext.fillText("Click to continue", 350, 500);
    return;
  }

  drawNet();

  //left player paddle
  colorRect(0, paddleLeftY, paddleThickness, paddleHeight, 'white');

  //right player paddle
  colorRect(canvas.width - paddleThickness, paddleRightY, paddleThickness, paddleHeight, 'white');

  //ball
  colorCircle(ballX, ballY, 10, 'white');

  //players score
  canvasContext.fillText(playerLeftScore, 100, 100);
  canvasContext.fillText(playerRightScore, canvas.width-100, 100);
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
