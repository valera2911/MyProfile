var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
//Объявление переменных как картинка
var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

//Поиск картинок
bird.src = "Image/bird.png";
background.src = "Image/background.png";
foreground.src = "Image/foreground.png";
pipeUp.src = "Image/pipeUp.png";
pipeBottom.src = "Image/pipeBottom.png";

var score = 0;
var gap = 100;
//Позиция птички

var xPos = 10;
var yPos = 150;
var gravitation = 1.5;

//Звуковые файлы
var flyBirdAudio = new Audio();
var scoreAudio = new Audio();

flyBirdAudio.src = "Audio/flyBird.mp3";
scoreAudio.src = "Audio/score.mp3";

//Движение птички при нажатии на клавишу
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 30;
  flyBirdAudio.play();
}

//Создание блоков
var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

//Отображение объектов на экране
function displayingImage() {
  ctx.drawImage(background, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

    if (pipe[i].x == 100) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      xPos + bird.width >= pipe[i].x &&
      xPos <= pipe[i].x + pipeUp.width &&
      (yPos <= pipe[i].y + pipeUp.height ||
        yPos + bird.height >= pipe[i].y + pipeUp.height + gap ||
        yPos + bird.height >= cvs.height - foreground.height)
    ) {
      location.reload(); // Перезагрузка страницы
    }

    if (pipe[i].x == 5) {
      score++;
      scoreAudio.play();
    }
  }

  ctx.drawImage(foreground, 0, cvs.height - foreground.height);
  ctx.drawImage(bird, xPos, yPos);
  yPos += gravitation;
  // Текст счета + его учет
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);
  requestAnimationFrame(displayingImage);
}

pipeBottom.onload = displayingImage;


function mainPage() {
  window.open("index.html", '_self');
}   //Загрузка главной страницы при нажатии кнопки "Главная" в шапке страницы