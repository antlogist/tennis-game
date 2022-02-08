import * as shape from './modules/shapes.js';
import * as movement from './modules/movement.js';

let canvas;
let canvasContext;
const framesPerSecond = 30;

//BallX
let ballX = 75;
let ballSpeedX = 15;

//BallY
let ballY = 75;
let ballSpeedY = 15;

window.onload = function() {
  canvas = document.querySelector("#gameCanvas");
  canvasContext = canvas.getContext('2d')

  setInterval(updateAll, 1000/framesPerSecond);

}

function updateAll() {

  const ballMovement = movement.ballMovement(ballX, ballY, ballSpeedX, ballSpeedY, canvas.width, canvas.height);

  ballX = ballMovement.ballX;
  ballY = ballMovement.ballY;
  ballSpeedX = ballMovement.ballSpeedX;
  ballSpeedY = ballMovement.ballSpeedY;

  shape.rect(canvasContext, 'black', 0, 0, canvas.width, canvas.height);
  shape.circle(canvasContext, 'white', ballX, ballY, 10);
}