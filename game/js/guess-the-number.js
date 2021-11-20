let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

var message = document.querySelector('.message');
var userscore = document.querySelector('.score');
var usersecretnumber = document.querySelector('.secret-number');
var userguess = document.querySelector('.guess');
var guessbtn = document.querySelector('.guess-btn');
var playagain = document.querySelector('.play-again');

var userhighscore = document.querySelector('.highscore');
var userwins = document.querySelector('.wins');
var userlosses = document.querySelector('.losses');
var totalgames = document.querySelector('.total-games');

var stats1 = localStorage.getItem("highestscore");
var stats2 = localStorage.getItem("totalwins");
var stats3 = localStorage.getItem("totallosses");
var stats4 = localStorage.getItem("totalgames");
var storedHighscore = parseInt(stats1);
var storedWins = parseInt(stats2);
var storedLosses = parseInt(stats3);
var storedGames = parseInt(stats4);

window.addEventListener('load', function () {
  if (storedGames) {
    userhighscore.innerHTML = storedHighscore
    userwins.innerHTML = storedWins
    userlosses.innerHTML = storedLosses
    totalgames.innerHTML = storedGames
  } else {
    localStorage.setItem("highestscore", 0)
    localStorage.setItem("totalwins", 0)
    localStorage.setItem("totallosses", 0)
    localStorage.setItem("totalgames", 0)
  }
})

function displayMessage(msg) {
  message.innerHTML = msg;
}

playagain.addEventListener('click', function () {
  score = 20;
  userscore.textContent = 20;
  userhighscore.textContent = 0;
  usersecretnumber.textContent = '?';
  userguess.value = '';
  displayMessage('Start playing...');
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  playagain.style.display = "none";
  guessbtn.style.display = "unset";
});

guessbtn.addEventListener('click', function () {
  const guess = userguess.value;

  if (guess < 1 || guess > 20) {
    displayMessage('Please choose a number between 1 and 20');
  } else if (guess == secretNumber) {
    displayMessage('Correct Number!');
    localStorage.setItem("totalwins", storedWins + 1);
    localStorage.setItem("totalgames", storedGames + 1);
    userwins.textContent = storedWins + 1;
    totalgames.textContent = storedGames + 1;
    usersecretnumber.textContent = secretNumber;

    if (score > storedHighscore) {
      userhighscore.textContent = score;
      localStorage.setItem("highestscore", score)
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too Low!');
      score--;
      userscore.textContent = score;
    } else {
      displayMessage('You lost the game!');
      userscore.textContent = 0;
      userlosses.textContent = storedLosses + 1
      totalgames.textContent = storedGames + 1;
      localStorage.setItem("totallosses", storedLosses + 1);
      localStorage.setItem("totalgames", storedGames + 1);
      playagain.style.display = "unset";
      guessbtn.style.display = "none";
    }
  }
});