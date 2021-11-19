function palindrome() {
  var word = document.querySelector("input").value.toUpperCase();
  var result = document.querySelector(".result");
  var palindrome = word
    .split('')
    .reverse()
    .join('');
  if (word.length < 3) {
    result.innerHTML = "<span>Please enter some more letters...</span>"
  } else if (word.length >= 3 && word === palindrome) {
    result.innerHTML = `<span class='text-success'> <b>"${word}"</b> is a palindrome! </span>`
  } else {
    result.innerHTML = `<span class='text-danger'> <b>"${word}"</b> is not a palindrome! </span>`
  }
}