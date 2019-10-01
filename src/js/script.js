// Defining the variables
const squares = document.querySelectorAll(".squares__square"),
      colorDisplay = document.querySelector("#colorDisplay"),
      header = document.querySelector(".header"),
      resetButton = document.querySelector("#reset"),
      messageDisplay = document.querySelector("#msg"),
      difBtn = document.querySelectorAll(".btn-difficulty"),
      btns = document.querySelectorAll(".btn");

//the colorsLenght defines the difficulty level of the game
let colorsLength = 6;
// Creating the random colors array
let colors = createRandomColors(colorsLength);
let gameOver = false;

// Selecting one of the random colors
let pickedColor = pickColor();

resetButton.addEventListener("click", function() {
  this.textContent = "Change Colors";
  resetGame(colorsLength);
});

difBtn.forEach(function(btn) {
  btn.addEventListener("click", function(){
    if(!gameOver) {
    difBtn.forEach(function(btn){
      btn.classList.remove("selected");
    });
    this.classList.add("selected");
    }
    if (!gameOver) {
      colorsLength = this.textContent === "Easy" ? 3 : 6;
      resetButton.textContent = "Change Colors";
      resetGame(colorsLength);
    }
  });
});

for (let i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", guessColor);
}

function createRandomColors(arrayLength) {
  let colorArr = [];
  for (let i = 0; i < arrayLength; i++) colorArr.push(randomColor());
  return colorArr;
}

function guessColor() {
  if (!gameOver) {
    if (this.style.backgroundColor === pickedColor) {
      //paints all the squares with the picked color
      squares.forEach(function(square) {
        square.style.backgroundColor = pickedColor;
      });
      messageDisplay.textContent = "Correct!";
      header.style.background = pickedColor;
      resetButton.textContent = "Try again?";
      gameOver = true;
    } else {
      //the wrong guess 'disappears' if the user clicks on it
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "Wrong! Pick another";
    }
  }
}

function randomColor() {
  //create the three color channels
  let ch1 = Math.floor(Math.random() * 256),
      ch2 = Math.floor(Math.random() * 256),
      ch3 = Math.floor(Math.random() * 256);
  //return color in rgb format (e.g.: rgb(123,123,123))
  return `rgb(${ch1}, ${ch2}, ${ch3})`;
}

function pickColor() {
  let color = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.textContent = color;
  return color;
}

function resetGame(length) {
  messageDisplay.textContent = "";
  colors = createRandomColors(length);
  pickedColor = pickColor();
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
    gameOver = false;
    header.style.background = "steelblue";
  }
}