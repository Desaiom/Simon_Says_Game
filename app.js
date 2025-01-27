let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "green"];

let h2 = document.querySelector("h2");
let level = 0;
let started = false;
let highestScore = localStorage.getItem('highestScore') || 0;  // Retrieve highest score from localStorage

// Display highest score on the page
let highestScoreDisplay = document.querySelector(".highest-score");
highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started!!!");
    started = true;
  }
  levelUp();
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);

  console.log(gameSeq);
  gameSeq.push(randColor);
  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
    },200);
    
    // Check and update highest score
    if (level > highestScore) {
      highestScore = level;
      localStorage.setItem('highestScore', highestScore);  // Save to localStorage
      highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;  // Update display
    }
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
