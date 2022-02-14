import * as helper from './helper.js';
export function ballMovement(ballX,ballY, ballSpeedX,ballSpeedY, ballRadius, canvasWidth,canvasHeight, paddleX,paddleY, paddleWidth,paddleHeight) {

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvasWidth && ballSpeedX > 0.0) {
    ballSpeedX *= -1;
  } else if(ballX < 0 && ballSpeedX < 0.0) {
    ballSpeedX *= -1;
  }

  if(ballY < 0 && ballSpeedY < 0.0) {
    ballSpeedY *= -1;
  }

//Paddle collision
 const paddleCollision = paddleHandling(ballX,ballY, ballSpeedX,ballSpeedY, ballRadius, paddleX, paddleWidth,paddleHeight, canvasHeight);
 ballSpeedX = paddleCollision.ballSpeedX;
 ballSpeedY = paddleCollision.ballSpeedY;


  return  {
    ballX,
    ballY,
    ballSpeedX,
    ballSpeedY
  }

}

function paddleHandling(ballX,ballY, ballSpeedX,ballSpeedY, ballRadius, paddleX, paddleWidth,paddleHeight, canvasHeight) {
  //Paddle edges
  const paddleTopEdgeY = canvasHeight - paddleHeight - canvasHeight * 0.1;
  const paddleBottomEdgeY = paddleTopEdgeY + paddleHeight;
  const paddleLeftEdgeX = paddleX;
  const paddleRightEdgeX = paddleX + paddleWidth;

  // Reflect ball
  if(ballY > paddleTopEdgeY - ballRadius && //bellow the top of paddle
     ballY < paddleBottomEdgeY && //above bottom of paddle
     ballX > paddleLeftEdgeX - ballRadius && //right of the left side of paddle
     ballX < paddleRightEdgeX + ballRadius) { //left of the right side of paddle
        ballSpeedY *= -1;

        const centerOfPaddleX = paddleX + paddleWidth / 2;
        //negative = left
        const ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
        ballSpeedX = ballDistFromPaddleCenterX * 0.35;
  }
  return {
    ballSpeedX: ballSpeedX,
    ballSpeedY: ballSpeedY
  }
}

export function updateMousePos(evt, canvas) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  const mouseX = evt.clientX - rect.left - root.scrollLeft;
  const mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    mouseX,
    mouseY
  }
}

export function brickRemoving(ballX,ballY, ballSpeedX,ballSpeedY, brickWidth,brickHeight, brickCols,brickRows, brickGrid, canvas) {
  const ballBrickCol = Math.floor(ballX / brickWidth);
  const ballBrickRow = Math.floor(ballY / brickHeight);
  const brickIndexUnderBall = helper.rowColToArrayIndex(ballBrickCol, ballBrickRow, brickCols);

  if(brickIndexUnderBall >= 0 && brickIndexUnderBall < brickCols * brickRows &&
     ballX > 0 && ballX < canvas.width) {

      const prevBallX = ballX - ballSpeedX;
      const prevBallY = ballY - ballSpeedY;
      const prevBrickCol = Math.floor(prevBallX / brickWidth);
      const prevBrickRow = Math.floor(prevBallY / brickHeight);

      let bothTestsFailed = true;

      //ball crossed new col
      if(prevBrickCol != ballBrickCol) {

        const adjBrickSide = helper.rowColToArrayIndex(prevBrickCol, ballBrickRow, brickCols);

        if(brickGrid[adjBrickSide] == false) {
          ballSpeedX *= -1;
          bothTestsFailed = false;
        }

      }

      //ball crossed new row
      if(prevBrickRow != ballBrickRow) {

        const adjBrickTopBot = helper.rowColToArrayIndex(ballBrickCol, prevBrickRow, brickCols);
        if(brickGrid[adjBrickTopBot] == false) {
          ballSpeedY *= -1;
          bothTestsFailed = false;
        }

      }

      //armpit case, prevents ball from going through
      if(bothTestsFailed) {
        ballSpeedX *= -1;
        ballSpeedY *= -1;
      }

      return {
        brickIndexUnderBall: brickIndexUnderBall,
        ballSpeedX: ballSpeedX,
        ballSpeedY: ballSpeedY
      }

  } else {
    return null;
  }
}
