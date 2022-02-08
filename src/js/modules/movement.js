export function ballMovement(x, y, sX, sY, w, h) {
  let ballX = x;
  let ballY = y
  let ballSpeedX = sX;
  let ballSpeedY = sY;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX >= w) {
    ballSpeedX *= -1;
  } else if(ballX <= 0) {
    ballSpeedX *= -1;
  }

  if(ballY >= h) {
    ballSpeedY *= -1;
  } else if(ballY <= 0) {
    ballSpeedY *= -1;
  }

  return  {
    ballX,
    ballY,
    ballSpeedX,
    ballSpeedY
  }

}