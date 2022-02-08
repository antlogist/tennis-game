import * as shape from './modules/shapes.js';
import * as movement from './modules/movements.js';

let canvas;
let canvasContext;
const framesPerSecond = 30;

//Paddle
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX;

//BallX
let ballX = 75;
let ballSpeedX = 15;

//BallY
let ballY = 75;
let ballSpeedY = 15;


window.onload = function() {
  canvas = document.querySelector("#gameCanvas");
  canvasContext = canvas.getContext('2d')

  //Paddel start position
  paddleX = canvas.width / 2 - paddleWidth / 2;

  //Frames
  setInterval(updateAll, 1000 / framesPerSecond);

  //Mouse movement
  canvas.addEventListener('mousemove', function(evt) {
    const mouseMovement = movement.updateMousePos(evt, canvas);

    //Paddle movement. Mouse center
    paddleX = mouseMovement.mouseX - paddleWidth / 2;
  });

}

function updateAll() {
  //Ball movement
  const ballMovement = movement.ballMovement(ballX, ballY, ballSpeedX, ballSpeedY, canvas.width, canvas.height);

  //Vars updating
  ballX = ballMovement.ballX;
  ballY = ballMovement.ballY;
  ballSpeedX = ballMovement.ballSpeedX;
  ballSpeedY = ballMovement.ballSpeedY;

  //Shapes drawing
  //Game field
  shape.rect(canvasContext, 'black', 0, 0, canvas.width, canvas.height);
  //Paddle
  shape.rect(canvasContext, 'white', paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  //Ball
  shape.circle(canvasContext, 'white', ballX, ballY, 10);
}