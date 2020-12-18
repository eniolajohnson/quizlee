var $username = document.querySelector('h1');
var $text = document.querySelector('h3');
var $form = document.querySelector('#form');
var $inputName = document.querySelector('#input-name');
var $enterButton = document.querySelector('#enter-button');
var $startButton = document.querySelector('#start-button');
var $buttons = document.querySelectorAll('button');
var $answerButtons = document.querySelector('.buttons');
var $p = document.querySelector('p');

function changeName(e) {
  if($inputName.value <= 0){
    $username.textContent = 'We need a name to play the game...';
  } else {
    $username.textContent = $inputName.value + ',';
    $text.textContent = 'ready to test your knowledge on earthly things?';
    $inputName.classList.add('hidden');
    $enterButton.classList.add('hidden');
    $startButton.classList.remove('hidden');
    userData.username = $inputName.value;
  }
}

$enterButton.addEventListener('click', changeName);

function startGame(e){
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
  var xhrResponse = xhr.response;
  var data = xhrResponse.results;
  var answers = [];
  var correctAnswer = '';

    for (var i = 0; i < data.length; i++) {
      $text.innerHTML = data[i].question;
      $startButton.value = 'Next';
      correctAnswer = data[i].correct_answer;
      answers = (data[i].incorrect_answers);
      answers.push(correctAnswer);
      answers.sort();
      $buttons[0].classList.remove('hidden');
      $buttons[1].classList.remove('hidden');
      $buttons[2].classList.remove('hidden');
      $buttons[3].classList.remove('hidden');
      $p.classList.remove('hidden');
      $buttons[0].innerHTML = answers[0];
      $buttons[1].innerHTML = answers[1];
      $buttons[2].innerHTML = answers[2];
      $buttons[3].innerHTML = answers[3];
      $buttons.forEach(function(elem){
        elem.addEventListener("click", function (e) {
          if (e.target.textContent === correctAnswer) {
            e.target.className = 'green';
            $p.textContent = '';
          } else if (e.target.textContent !== correctAnswer) {
            e.target.className = 'red';
            $p.textContent = `The correct answer was ${correctAnswer}.`;
          }
        })
      })
      $p.textContent = '';
      $buttons[0].className = 'gray';
      $buttons[1].className = 'gray';
      $buttons[2].className = 'gray';
      $buttons[3].className = 'gray';

    }


  })


xhr.send();
}



$startButton.addEventListener('click', startGame);
