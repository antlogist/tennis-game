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

export function updateMousePos(evt, canvas) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  const mouseX = evt.clientX - rect.left - root.scrollLeft;
  const mouseY = evt.clientY - rect.top - root.scrollTop;

  console.log(mouseX);

  return {
    mouseX,
    mouseY
  }
}
