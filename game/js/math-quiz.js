var difficulty = document.getElementById('difficulty')
var noq = document.getElementById('noq')
var noqCount = document.getElementById('noqCount')
var min = document.getElementById('min')
var sec = document.getElementById('sec')
var timerStart = document.getElementById('timerStart')
var timerStop = document.getElementById('timerStop')
var timerDisplay = document.getElementById('timerDisplay')
var question = document.getElementById('question')
var result = document.getElementById('result')
var answer = document.getElementById('answer')
var skipbtn = document.getElementById('skip')
var nextbtn = document.getElementById('next')
var secret;

var USEReasyCorrects = 0
var USEReasyTotal = 0
var USEReasySkips = 0
var USERnormalCorrects = 0
var USERnormalTotal = 0
var USERnormalSkips = 0
var USERhardCorrects = 0
var USERhardTotal = 0
var USERhardSkips = 0

function checkUserRecord() {
  if (localStorage.getItem("USEReasyTotal") || localStorage.getItem("USERnormalTotal") || localStorage.getItem("USERhardTotal")) {
    USEReasyCorrects = parseInt(localStorage.getItem("USEReasyCorrects"))
    USEReasyTotal = parseInt(localStorage.getItem("USEReasyTotal"))
    USEReasySkips = parseInt(localStorage.getItem("USEReasySkips"))
    USERnormalCorrects = parseInt(localStorage.getItem("USERnormalCorrects"))
    USERnormalTotal = parseInt(localStorage.getItem("USERnormalTotal"))
    USERnormalSkips = parseInt(localStorage.getItem("USERnormalSkips"))
    USERhardCorrects = parseInt(localStorage.getItem("USERhardCorrects"))
    USERhardTotal = parseInt(localStorage.getItem("USERhardTotal"))
    USERhardSkips = parseInt(localStorage.getItem("USERhardSkips"))

    $('#easy-corrects').html(USEReasyCorrects)
    $('#easy-total').html(USEReasyTotal)
    $('#easy-skips').html(USEReasySkips)
    $('#normal-corrects').html(USERnormalCorrects)
    $('#normal-total').html(USERnormalTotal)
    $('#normal-skips').html(USERnormalSkips)
    $('#hard-corrects').html(USERhardCorrects)
    $('#hard-total').html(USERhardTotal)
    $('#hard-skips').html(USERhardSkips)
  } else {
    localStorage.setItem("USEReasyCorrects", 0)
    localStorage.setItem("USEReasyTotal", 0)
    localStorage.setItem("USEReasySkips", 0)
    localStorage.setItem("USERnormalCorrects", 0)
    localStorage.setItem("USERnormalTotal", 0)
    localStorage.setItem("USERnormalSkips", 0)
    localStorage.setItem("USERhardCorrects", 0)
    localStorage.setItem("USERhardTotal", 0)
    localStorage.setItem("USERhardSkips", 0)
  }
}

function updateUserRecord(record, recordValue) {
  recordItem = parseInt(localStorage.getItem(record))
  localStorage.setItem(record, recordItem + recordValue)
}

window.onload = function () {
  quiz();
  checkUserRecord();
  console.log(secret)
}

setInterval(() => {
  checkUserRecord();
}, 1000);

var minoptions, secoptions;
for (var i = 0; i <= 10; i++) {
  minoptions += "<option value=" + i + ">" + i + "</option>";
}
for (var i = 0; i <= 59; i++) {
  secoptions += "<option value=" + i + ">" + i + "</option>";
}
min.innerHTML = minoptions;
sec.innerHTML = secoptions;

$(min).on('change', function () {
  mm = min.value
  ss = sec.value
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  timerDisplay.innerHTML = mm + ":" + ss + ":" + '00'
})
$(sec).on('change', function () {
  mm = min.value
  ss = sec.value
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  timerDisplay.innerHTML = mm + ":" + ss + ":" + '00'
})
$(noq).on('change', function () {
  noqCount.innerHTML = 0 + '/' + noq.value
})

// ==============================
// ====== TIMER FUNCTIONS =======
// ==============================


var duration = 0;
var currentQuestion = 0;
var countdown = null;

function timer() {
  var quiztime = +(min.value * 60) + +sec.value;
  console.log(quiztime)
  if (quiztime <= 600 && quiztime >= 30) {
    difficulty.disabled = true
    duration = moment.duration(quiztime * 1000, 'milliseconds');
    countdown = setInterval(() => {
      duration = moment.duration(duration - 10, 'milliseconds');
      mm = duration.minutes();
      ss = duration.seconds();
      ms = Math.floor(duration.milliseconds() / 10).toFixed(0);
      mm = mm < 10 ? "0" + mm : mm;
      ss = ss < 10 ? "0" + ss : ss;
      ms = ms < 10 ? "0" + ms : ms;
      timerDisplay.innerHTML = mm + ":" + ss + ":" + ms
      if (duration == 0) {
        clearInterval(countdown)
        $(timerStart).attr('disabled', false)
        $(timerStop).attr('disabled', true)
        noqCount.innerHTML = 0 + '/' + noq.value
        currentQuestion = 0;
        difficulty.disabled = false
      }

    }, 10);
    $(timerStart).attr('disabled', true)
    $(timerStop).attr('disabled', false)
  } else {
    $('.timerwarning').attr('hidden', false)
  }
}

timerStart.addEventListener('click', () => {
  currentQuestion = 1;
  noqCount.innerHTML = 1 + '/' + noq.value
  timer();
  quiz();
  console.log(secret)
  if (skipbtn.hasAttribute('hidden')) {
    skipbtn.hidden = false
    nextbtn.hidden = true
  }
  answer.value = "";
  result.innerHTML = "";
});

timerStop.addEventListener('click', () => {
  clearInterval(countdown)
  $(timerStart).attr('disabled', false)
  $(timerStop).attr('disabled', true)
  timerDisplay.innerHTML = '00:00:00'
  currentQuestion = 0;
  countdown = null;
  noqCount.innerHTML = 0 + '/' + noq.value
  difficulty.disabled = false
  skipbtn.disabled = false
});

// ==============================
// ======= QUIZ FUNCTIONS =======
// ==============================
function quiz() {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var operators = ['+', '-', '*', '/'];
  var operator = operators[Math.floor(Math.random() * operators.length)]
  var symbol;
  switch (operator) {
    case '*':
      symbol = 'x'
      break;
    case '/':
      symbol = '&#xf7;'
      break;
    default:
      symbol = operator
      break;
  }

  var num1, num2, num3;
  if (difficulty.value == 'easy') {
    num1 = random(-9, 9)
    num2 = random(-9, 9)
    num1 == 0 ? num1 = random(-9, 9) : random(-9, 9);
    num2 == 0 ? num2 = random(-9, 9) : random(-9, 9);
    question.innerHTML = num1 + ' ' + symbol + ' ' + num2
    var operation = [num1, operator, num2]
    secret = (eval(operation.join(' ')))

  } else if (difficulty.value == 'normal') {
    num1 = random(-99, 99)
    num2 = random(-99, 99)
    num1 == 0 ? num1 = random(-99, 99) : random(-99, 99);
    num2 == 0 ? num2 = random(-99, 99) : random(-99, 99);
    question.innerHTML = num1 + ' ' + symbol + ' ' + num2
    var operation = [num1, operator, num2]
    secret = (eval(operation.join(' ')))

  } else if (difficulty.value == 'hard') {
    num1 = random(-999, 999)
    num2 = random(-999, 999)
    num3 = random(-999, 999)
    num1 == 0 ? num1 = random(-999, 999) : random(-999, 999);
    num2 == 0 ? num2 = random(-999, 999) : random(-999, 999);
    num3 == 0 ? num3 = random(-999, 999) : random(-999, 999);
    question.innerHTML = num1 + ' ' + symbol + ' ' + num2
    var operation = [num1, operator, num2]
    secret = (eval(operation.join(' ')))

  }
}

function btns() {
  if (nextbtn.hasAttribute('hidden')) {
    skipbtn.hidden = true
    nextbtn.hidden = false
  } else {
    nextbtn.hidden = true
    skipbtn.hidden = false
  }
}

function btnClick() {
  if (countdown && duration != 0) {
    currentQuestion++
    console.log(currentQuestion)
    noqCount.innerHTML = currentQuestion + '/' + noq.value
    if (currentQuestion == noq.value) {
      skipbtn.disabled = true
    }
  }
}

function quizsubmit() {

  if (answer.value == secret) {
    $(result).toggleClass("text-success");
    result.innerHTML = 'Correct Answer!'
    btns();

    if (currentQuestion == noq.value) {
      clearInterval(countdown)
      $(timerStart).attr('disabled', false)
      $(timerStop).attr('disabled', true)
      console.log(timerDisplay.innerHTML)
      currentQuestion = 1;
      countdown = null;
      difficulty.disabled = false
    }

    if (difficulty.value == "easy") {
      updateUserRecord("USEReasyCorrects", 1)
      updateUserRecord("USEReasyTotal", 1)
    } else if (difficulty.value == "normal") {
      updateUserRecord("USERnormalCorrects", 1)
      updateUserRecord("USERnormalTotal", 1)
    } else if (difficulty.value == "hard") {
      updateUserRecord("USERhardCorrects", 1)
      updateUserRecord("USERhardTotal", 1)
    }

  } else {
    if ($(result).hasClass('text-success') == true) {
      $(result).toggleClass("text-success");
    }
    result.innerHTML = 'Wrong Answer!'
    if (difficulty.value == "easy") {
      localStorage.setItem("USEReasyTotal", USEReasyTotal + 1)
    } else if (difficulty.value == "normal") {
      localStorage.setItem("USERnormalTotal", USERnormalTotal + 1)
    } else if (difficulty.value == "hard") {
      localStorage.setItem("USERhardTotal", USERhardTotal + 1)
    }
  }
}

$(difficulty).on('change', function () {
  quiz();
  result.innerHTML = ''
  if (nextbtn.hasAttribute('hidden')) {} else {
    btns();
  }
  console.log(secret)
})

$(skipbtn).on('click', function () {
  quiz();
  result.innerHTML = ''
  console.log(secret)
  btnClick();

  if (difficulty.value == "easy") {
    updateUserRecord("USEReasySkips", 1)
  } else if (difficulty.value == "normal") {
    updateUserRecord("USERnormalSkips", 1)
  } else if (difficulty.value == "hard") {
    updateUserRecord("USERhardSkips", 1)
  }

});

$(nextbtn).on('click', function () {
  quiz();
  btns();
  result.innerHTML = ''
  console.log(secret)
  btnClick();
  if (currentQuestion == 1) {
    timerDisplay.innerHTML = '00:00:00'
    currentQuestion = 0
    skipbtn.disabled = false
    noqCount.innerHTML = 0 + '/' + noq.value
  }
})