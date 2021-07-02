//MAKE MORE BRICKS

//TOUCH A BRICK, IT BREAKS
//if posX = posY etc
// clearRect()
//delete

//SET LIVES
//tu commence avec 3 lives
//si tu perdu....... -1 life

//SCORE
//si tu casse une brick, cest +1

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

//LIVES VARIABLES

let livesleft = 3;

function drawLives() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText(`${livesleft} lives left`, 580, 690);
}

//BALL SPEED
var dx = 4;
var dy = -4;

//DEFINE ELEMENTS
let paddle = {
  width: 100,
  height: 20,
  posX: 320,
  posY: 650,
};

let ball = {
  posX: canvas.width / 2,
  posY: canvas.height - 200,
};

class Brick {
  constructor(posX, posY, height, width) {
    this.height = height;
    this.width = width;
    this.posX = posX;
    this.posY = posY;
  }
  drawBrick() {
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }
}

let brickA = new Brick(50, 50, 20, 20);

//DRAW RECTANGLE AND BALL

function drawRect() {
  ctx.beginPath();
  ctx.rect(paddle.posX, paddle.posY, paddle.width, paddle.height);
  ctx.stroke();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.posX, ball.posY, 20, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
  ball.posX += dx;
  ball.posY += dy;
  if (ball.posX > canvas.width) {
    dx = -dx;
  } else if (ball.posX < 20) {
    dx = -dx;
  } else if (ball.posY > canvas.height) {
    livesleft--;
    console.log(`You have ${livesleft} lives left`);
    ball.posX = canvas.width / 2;
    ball.posY = canvas.height - 200;
    dx = -dx;
    dy = -dy;
    if (livesleft === 0) {
      console.log("you lose");
    }
  } else if (ball.posY < 20) {
    dy = -dy;
  } else if (
    ball.posX - 5 >= paddle.posX &&
    ball.posX + 5 <= paddle.posX + 100 &&
    ball.posY - 5 >= paddle.posY - 22 &&
    ball.posY + 5 <= paddle.posY + 20
  ) {
    dy = -dy;
  }
}

function refresh() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect();
  drawBall();
  drawLives();
  brickA.drawBrick();
  window.requestAnimationFrame(refresh);
}
window.requestAnimationFrame(refresh);

document.onkeydown = function (e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  if (key === 37) {
    if (paddle.posX < 20) {
      paddle.posX = 0;
    } else {
      paddle.posX -= 15;
    }
  } else if (key === 39) {
    if (paddle.posX > canvas.width - 160) {
      paddle.posX = canvas.width - paddle.width;
    } else {
      paddle.posX += 15;
    }
  }
};
