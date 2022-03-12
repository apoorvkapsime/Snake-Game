//Game Variables here
let InputDirection = {
  x: 0,
  y: 0,
};
const foodSound = new Audio("files/food.mp3");
const gameoverSound = new Audio("files/gameover.mp3");
const themeSound = new Audio("files/theme.mp3");
const moveSound = new Audio("files/move.mp3");
let score = 0;
let speed = 5;
let lastTime = 0;
let snakeArr = [{ x: 13, y: 16 }];
let food = { x: 6, y: 10 };
//theme song here
themeSound.volume = 0.3;

//functions here
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastTime) / 1000 < 1 / speed) {
    return;
  }
  lastTime = ctime;
  // console.log(ctime)
  gameEngine();
  themeSound.play();
}
function gameEngine() {
  // part 1 Updating the snake array and food
  function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      return true;
    }
    // if(){
    //     return true;
    // }
  }

  if (isCollide(snakeArr)) {
    gameoverSound.play();
    themeSound.pause();
    InputDirection = { x: 0, y: 0 };
    alert("Game Over! Press any key to start again.");
    snakeArr = [{ x: 13, y: 16 }];
    themeSound.play();
    score = 0;
    let scoreda = document.getElementById("scored");
    scoreda.innerHTML = "Score : " + score;
  }
  // If you have eaten the food increase size and regenerate the food
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + InputDirection.x,
      y: snakeArr[0].y + InputDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score += 1;
    let hiscoreval1 = JSON.parse(hiscore);
    if (score > hiscoreval1) {
      hiscoreval1 = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval1));
      highScore.innerHTML = "High Score : " + hiscoreval1;
    }
    let scored = document.getElementById("scored");
    scored.innerHTML = "Score : " + score;
  }
  // Moving the Snake
  for (let index = snakeArr.length - 2; index >= 0; index--) {
    // const element = array[index];
    snakeArr[index + 1] = { ...snakeArr[index] };
  }
  snakeArr[0].x += InputDirection.x;
  snakeArr[0].y += InputDirection.y;

  // part 2.1 Displaying the snake
  let board = document.getElementById("board");

  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // part 2.2 Displaying the food

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic starts here
let highScore = document.getElementById("highScore");
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  let hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  highScore.innerHTML = `High Score : ${hiscore}`;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  InputDirection = { x: 0, y: -1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      InputDirection = { x: 0, y: -1 };
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      InputDirection = { x: 1, y: 0 };
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      InputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      InputDirection = { x: -1, y: 0 };
      break;

    default:
      break;
  }
});
function togglemute() {
  if (themeSound.muted) {
    themeSound.muted = false;
    document.getElementById("link").innerHTML =
      '<i class="fa-solid fa-volume-high"></i>';
  } else {
    themeSound.muted = true;
    document.getElementById("link").innerHTML =
      '<i class="fa-solid fa-volume-xmark"></i>';
  }
}
