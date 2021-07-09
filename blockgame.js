//MAKE MORE LEVEL BRICKS
// transformé les différents niveau en tableau?
//SCORE
//crée un système pour le score (++ si brique break, multiplicateur tant quelle touche pas le paddle)
//CONDITION COLLISION
//vérifier de quel côté se produit la collision pour renvoyer la balle dans la bonne direction
//Création du canvas (zone de jeu) et affectation d'une hauteur et d'une largeur
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

//LIVES VARIABLES

let livesleft = 1;
var loser = false;
//Ecrit dans le canvas un indicateur (ATH) lié aux nombres de vie restante avant le game over
function drawLives() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText(`${livesleft} lives left`, 580, 690);
}
// Affichage d'un text (fonction à appeler en cas de gameOver)
function startAgain() {
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(
    `Game over! Refresh to play again`,
    canvas.width / 2,
    canvas.height / 2
  );
}

//BALL SPEED
var dx = 3;
var dy = -3;

//DEFINE ELEMENTS
let paddle = {
  width: 100,
  height: 20,
  posX: 320,
  posY: 650,
  margeWidth: 100 / 5,
  margeHeight: 20 / 10,
};
//////////////////////////////////////////////////////////////////////
//CONSTRUCTEUR DE BALL
class Ball {
  constructor(posX, posY, radius, height) {
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.height = height;
  }
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    this.posX += dx;
    this.posY += dy;
  }
  collisionBorder() {
    if (this.posX > canvas.width) {
      dx = -dx;
    } else if (this.posX < this.radius) {
      dx = -dx;
    } else if (this.posY > canvas.height) {
      livesleft--;
      console.log(`You have ${livesleft} lives left`);
      this.posX = canvas.width / 2;
      this.posY = canvas.height - 200;
      dx = -dx;
      dy = -dy;
      if (livesleft === 0) {
        console.log("you lose, refresh to play again");
        dx = 0;
        dy = 0;
        loser = true;
      }
    } else if (this.posY < this.radius) {
      dy = -dy;
    }
  }
  collisionPaddle() {
    if (
      this.posX - this.radius >= paddle.posX - paddle.margeWidth &&
      this.posX + this.radius <= paddle.posX + paddle.width &&
      this.posY - this.radius >=
        paddle.posY - paddle.height + paddle.margeHeight &&
      this.posY + this.radius <= paddle.posY + paddle.height
    ) {
      dy = -dy;
    } else if (
      this.posX - this.radius >= paddle.posX - paddle.margeWidth * 1.5 &&
      this.posX + this.radius <=
        paddle.posX + paddle.width + paddle.margeWidth &&
      this.posY - this.radius >=
        paddle.posY - paddle.height + paddle.margeHeight &&
      this.posY + this.radius <=
        paddle.posY + paddle.height + paddle.margeHeight * 1.5
    ) {
      dy = -dy;
      dx = -dx;
    }
  }
  collisionBrick() {
    arrayOfLevel.forEach((element, index) => {
      if (
        this.posX - this.radius >= element.posX - element.width &&
        this.posX + this.radius <= element.posX + element.width * 2 &&
        this.posY - this.radius >= element.posY - element.height * 2 &&
        this.posY + this.radius <= element.posY + element.height * 2
      ) {
        console.log(index);
        console.log("okkkk");
        arrayOfLevel.splice(index, 1);
        dy = -dy;
        dx = -dx;
      }
      element.drawBrick();
    });
  }
  upDate() {
    this.collisionBorder();
    this.collisionPaddle();
    this.collisionBrick();
    this.drawBall();
  }
}
let ballA = new Ball(canvas.width / 2, canvas.height - 200, 10, 20);
console.log("ici", paddle.margeWidth);
//////////////////////////////////////////////////////////////////////
//CONSTRUCTEUR DE BRIQUES
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
// TABLEAU QUI REPRESENTE LE LEVEL (BRIQUES) A DESSINER
let arrayOfLevel = [];
//LEVEL1 => crée X nombres de briques et postionnement
function levelOne() {
  for (let i = 40; i < canvas.width; i += 120) {
    for (let j = 0; j < canvas.height / 3; j += 40) {
      const element = new Brick(i, j, 20, 20);
      arrayOfLevel.push(element);
    }
  }
}
levelOne();
// console.log(arrayOfLevel);

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.posX, paddle.posY, paddle.width, paddle.height);
  ctx.stroke();
  ctx.closePath();
}
//function PRINCIPALE qui s'auto effectue toutes les 16ms
function refresh() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  ballA.upDate();
  drawLives();
  if (loser == true) {
    startAgain();
  }
  window.requestAnimationFrame(refresh);
}
window.requestAnimationFrame(refresh);
document.addEventListener("keydown", function (e) {
  if (e.code == "ArrowLeft") {
    if (paddle.posX < 20) {
      paddle.posX = 0;
    } else {
      paddle.posX -= 25;
    }
  } else if (e.code == "ArrowRight") {
    if (paddle.posX > canvas.width - 160) {
      paddle.posX = canvas.width - paddle.width;
    } else {
      paddle.posX += 25;
    }
  }
});
