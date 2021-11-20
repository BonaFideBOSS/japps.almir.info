let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

var message = document.querySelector('.message');
var userscore = document.querySelector('.score');
var chances = document.querySelector('.chances');
var usersecretnumber = document.querySelector('.secret-number');
var secretnumbebox = document.querySelector('.secret-number-box');
var userguess = document.querySelector('.guess');
var guessbtn = document.querySelector('.guess-btn');
var playagain = document.querySelector('.play-again');

var userhighscore = document.querySelector('.highscore');
var userwins = document.querySelector('.wins');
var userlosses = document.querySelector('.losses');
var totalguesses = document.querySelector('.total-guesses');
var totalgames = document.querySelector('.total-games');
var reset = document.querySelector('.reset');

window.addEventListener('load', function () {
  var stats1 = localStorage.getItem("highestscore");
  var stats2 = localStorage.getItem("totalwins");
  var stats3 = localStorage.getItem("totallosses");
  var stats4 = localStorage.getItem("totalgames");
  var stats5 = localStorage.getItem("totalguesses");
  var storedHighscore = parseInt(stats1);
  var storedWins = parseInt(stats2);
  var storedLosses = parseInt(stats3);
  var storedGames = parseInt(stats4);
  var storedGuesses = parseInt(stats5);
  if (storedGuesses) {
    userhighscore.innerHTML = storedHighscore
    userwins.innerHTML = storedWins
    userlosses.innerHTML = storedLosses
    totalgames.innerHTML = storedGames
    totalguesses.innerHTML = storedGuesses
  } else {
    localStorage.setItem("highestscore", 0)
    localStorage.setItem("totalwins", 0)
    localStorage.setItem("totallosses", 0)
    localStorage.setItem("totalgames", 0)
    localStorage.setItem("totalguesses", 0)
  }
})

function displayMessage(msg) {
  message.innerHTML = msg;
}

playagain.addEventListener('click', function () {
  secretnumbebox.classList.remove('bg-success');
  secretnumbebox.classList.remove('bg-danger');
  secretnumbebox.classList.remove('text-white');
  score = 20;
  userscore.textContent = 20;
  chances.textContent = score
  usersecretnumber.innerHTML = '<i class="fas fa-question"></i>';
  userguess.value = '';
  displayMessage('Start playing...');
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  playagain.style.display = "none";
  guessbtn.style.display = "unset";
});

guessbtn.addEventListener('click', function () {
  const guess = userguess.value;
  var stats1 = localStorage.getItem("highestscore");
  var stats2 = localStorage.getItem("totalwins");
  var stats3 = localStorage.getItem("totallosses");
  var stats4 = localStorage.getItem("totalgames");
  var stats5 = localStorage.getItem("totalguesses");
  var storedHighscore = parseInt(stats1);
  var storedWins = parseInt(stats2);
  var storedLosses = parseInt(stats3);
  var storedGames = parseInt(stats4);
  var storedGuesses = parseInt(stats5);

  if (guess < 1 || guess > 20) {
    displayMessage('Please choose a number between 1 and 20');
  } else if (guess == secretNumber) {
    secretnumbebox.classList.toggle('bg-success');
    secretnumbebox.classList.toggle('text-white');
    displayMessage('Correct Number!');
    localStorage.setItem("totalwins", storedWins + 1);
    localStorage.setItem("totalgames", storedGames + 1);
    userwins.textContent = storedWins + 1;
    totalgames.textContent = storedGames + 1;
    usersecretnumber.innerHTML = secretNumber;

    playagain.style.display = "unset";
    guessbtn.style.display = "none";

    if (score > storedHighscore) {
      userhighscore.textContent = score;
      localStorage.setItem("highestscore", score)
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too Low!');
      score--;
      userscore.textContent = score;
      chances.textContent = score
      localStorage.setItem("totalguesses", storedGuesses + 1)
      totalguesses.textContent = storedGuesses + 1
    } else {
      displayMessage('You lost the game!');
      usersecretnumber.innerHTML = secretNumber;
      secretnumbebox.classList.toggle('bg-danger')
      secretnumbebox.classList.toggle('text-white')
      userscore.textContent = 0;
      chances.textContent = 0;
      userlosses.textContent = storedLosses + 1
      totalgames.textContent = storedGames + 1;
      totalguesses.textContent = storedGuesses + 1
      localStorage.setItem("totallosses", storedLosses + 1);
      localStorage.setItem("totalgames", storedGames + 1);
      localStorage.setItem("totalguesses", storedGuesses + 1)
      playagain.style.display = "unset";
      guessbtn.style.display = "none";
    }
  }
});

reset.addEventListener('click', function () {
  userhighscore.innerHTML = '-'
  userwins.innerHTML = '-'
  userlosses.innerHTML = '-'
  totalgames.innerHTML = '-'
  totalguesses.innerHTML = '-'
  localStorage.setItem("highestscore", 0)
  localStorage.setItem("totalwins", 0)
  localStorage.setItem("totallosses", 0)
  localStorage.setItem("totalgames", 0)
  localStorage.setItem("totalguesses", 0)
});