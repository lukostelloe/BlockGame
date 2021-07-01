const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

// var x = canvas.width / 2;
// var y = canvas.height - 200;
var dx = 2;
var dy = -2;

let paddle = {
  width: 150,
  height: 20,
  posX: 320,
  posY: 650,
};

let ball = {
  posX: canvas.width / 2,
  posY: canvas.height - 200,
};

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
}

function refresh() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect();
  drawBall();
  window.requestAnimationFrame(refresh);
}
window.requestAnimationFrame(refresh);

console.log("hello");

document.onkeydown = function (e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  if (key === 37) {
    console.log("left");
    if (paddle.posX < 20) {
      paddle.posX = 0;
    } else {
      paddle.posX -= 15;
    }
  } else if (key === 39) {
    console.log("right");
    if (paddle.posX > canvas.width - 160) {
      paddle.posX = canvas.width - paddle.width;
    } else {
      paddle.posX += 15;
    }
  }
  console.log(paddle.posX);
};
