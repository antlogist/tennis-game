export function ballMovement(ballX,ballY, ballSpeedX,ballSpeedY, ballRadius, canvasWidth,canvasHeight, paddleX,paddleY, paddleWidth,paddleHeight) {

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX >= canvasWidth) {
    ballSpeedX *= -1;
  } else if(ballX <= 0) {
    ballSpeedX *= -1;
  }

  if(ballY <= 0) {
    ballSpeedY *= -1;
  }

   //Paddle edges
 const paddleTopEdgeY = canvasHeight - paddleHeight - canvasHeight * 0.1;
 const paddleBottomEdgeY = paddleTopEdgeY + paddleHeight;
 const paddleLeftEdgeX = paddleX;
 const paddleRightEdgeX = paddleX + paddleWidth;

 // Reflect ball
 if(ballY > paddleTopEdgeY - ballRadius && //bellow the top of paddle
    ballY < paddleBottomEdgeY && //above bottom of paddle
    ballX > paddleLeftEdgeX && //right of the left side of paddle
    ballX < paddleRightEdgeX) { //left of the right side of paddle
       ballSpeedY *= -1;

       const centerOfPaddleX = paddleX + paddleWidth / 2;
       //negative = left
       const ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
       ballSpeedX = ballDistFromPaddleCenterX * 0.35;
 }

  return  {
    ballX,
    ballY,
    ballSpeedX,
    ballSpeedY
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
