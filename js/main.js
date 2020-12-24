var $username = document.querySelector('h1');
var $text = document.querySelector('h3');
var $form = document.querySelector('#form');
var $inputName = document.querySelector('#input-name');
var $enterButton = document.querySelector('#enter-button');
var $startButton = document.querySelector('#start-button');
var $buttons = document.querySelectorAll('button');
var $answerButtons = document.querySelector('.buttons');
var $p = document.querySelector('p');
var $score = document.querySelector('span');

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

var count = 11;
var score = 0;

function startGame(e){
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');

  xhr.responseType = 'json';

  count--;

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
      $buttons.forEach(function (elem) {
        elem.classList.remove('hidden');
      })
      $p.classList.remove('hidden');
      $buttons[0].innerHTML = answers[0];
      $buttons[1].innerHTML = answers[1];
      $buttons[2].innerHTML = answers[2];
      $buttons[3].innerHTML = answers[3];

      $buttons.forEach(function(elem){
        elem.addEventListener("click", function (e) {
          if (e.target.textContent === correctAnswer) {
            score++;
            e.target.className = 'green';
            $p.textContent = '';
          } else if (e.target.textContent !== correctAnswer) {
            e.target.className = 'red';
            $p.textContent = `The correct answer was: ${correctAnswer}.`;
          }
        })
      })
      $score.className = 'score';
      $score.textContent = `Score: ${score}`;
      $p.textContent = '';
      $buttons.forEach(function (elem) {
        elem.className ='gray';
      })

    }

    if (count < 1){
      $username.textContent = `Welldone, ${$inputName.value}!`;
      $buttons.forEach(function(elem){
        elem.classList.add('hidden');
      })
      $startButton.classList.add('hidden');
      if (score < 5){
        $text.textContent = `But you still need a course in Earthly 101.`
      } else if (score > 5 && score < 7){
        $text.textContent = `You've got a pretty good knowledge of Earthly things!`
      } else if (score > 7){
        $text.textContent = `We are in awe of your knowledge!`
      }
      var total = 10;
      $p.textContent = `You got ${score} of ${total} correctly.`;
    }


  })


xhr.send();
}



$startButton.addEventListener('click', startGame);
