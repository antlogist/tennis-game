import * as helper from './modules/helper.js';
import * as shape from './modules/shapes.js';
import * as movement from './modules/movements.js';

let canvas;
let canvasContext;
const framesPerSecond = 30;

//Paddle
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX;
let paddleY;

const ballRadius = 10;

//BallX
let ballX = 75;
let ballSpeedX = 10;

//BallY
let ballY = 75;
let ballSpeedY = 5;

//Mouse
let mouseX;
let mouseY;

//Brick
const brickWidth = 80;
const brickHeight = 50;
const brickGap = 2;
const brickCols = 10;
const brickRows = 4;
let brickGrid = [];


window.onload = function() {
  canvas = document.querySelector("#gameCanvas");
  canvasContext = canvas.getContext('2d')

  //Paddel start position
  paddleX = canvas.width / 2 - paddleWidth / 2;
  paddleY = canvas.height - paddleHeight - canvas.height * 0.1;

  //Frames
  setInterval(updateAll, 1000 / framesPerSecond);

  //Mouse movement
  canvas.addEventListener('mousemove', function(evt) {
    const mouseMovement = movement.updateMousePos(evt, canvas);
    mouseX = mouseMovement.mouseX;
    mouseY = mouseMovement.mouseY;
    //Paddle movement. Mouse center
    paddleX = mouseX - paddleWidth / 2;
  });

  brickReset();
  ballReset();

}

function updateAll() {

  //Ball movement
  const ballMovement = movement.ballMovement(ballX,ballY, ballSpeedX,ballSpeedY, ballRadius, canvas.width,canvas.height, paddleX,paddleY, paddleWidth,paddleHeight);

  //Vars updating
  ballX = ballMovement.ballX;
  ballY = ballMovement.ballY;
  ballSpeedX = ballMovement.ballSpeedX;
  ballSpeedY = ballMovement.ballSpeedY;

  //Ball reset
  if(ballY >= canvas.height) {
    ballReset();
  }

  //Brick removing
  const brickRemoving = movement.brickRemoving(ballX,ballY, ballSpeedX,ballSpeedY, brickWidth,brickHeight, brickCols,brickRows, canvas);
  if (brickRemoving !== null && brickGrid[brickRemoving.brickIndexUnderBall]){
    brickGrid[brickRemoving.brickIndexUnderBall] = false;

    ballSpeedX = brickRemoving.ballSpeedX;
    ballSpeedY = brickRemoving.ballSpeedY;
  }

  //Shapes drawing
  //Game field
  shape.rect(canvasContext, 'black', 0,0, canvas.width,canvas.height);
  //Paddle
  shape.rect(canvasContext, 'white', paddleX,paddleY, paddleWidth,paddleHeight);
  //Ball
  shape.circle(canvasContext, 'white', ballX,ballY, ballRadius);
  //Bricks
  [...Array(brickRows)].map((row, rowI)=>  {
    brickGrid.map((col, colI) => {

      const arrIndex = helper.rowColToArrayIndex(colI, rowI, brickCols);

      if(brickGrid[arrIndex]) {
        shape.rect(canvasContext, 'coral', brickWidth * colI,brickHeight * rowI, brickWidth - brickGap,brickHeight - brickGap);
      }
    })
  });

}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2
}

function brickReset() {
  [...Array(brickCols * brickRows)].map((brick, i)=> {
    //random brick rendering
    // brickGrid[i] = Math.floor(Math.random() * 2) == 0;
    brickGrid[i] = true;
  });
}
