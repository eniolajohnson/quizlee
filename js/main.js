var $username = document.querySelector('h1');
var $text = document.querySelector('h3');
var $form = document.querySelector('#form');
var $inputName = document.querySelector('#input-name');
var $enterButton = document.querySelector('#enter-button');
var $startButton = document.querySelector('#start-button');
var $buttons = document.querySelector('.buttons');

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

  xhr.open('GET', 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
  var xhrResponse = xhr.response;
  var data = xhrResponse.results;
  var answers = [];
  var correctAnswer = '';
  var score = 0;

    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].question);
      $text.textContent = data[i].question;
      $startButton.classList.add('hidden');
      correctAnswer = data[i].correct_answer;
      answers = (data[i].incorrect_answers);
      answers.push(correctAnswer);
      console.log(correctAnswer);
      }

    answers.sort();


    for (answer in answers){
      var $answerButton = document.createElement('button');
      $answerButton.textContent = answers[answer];
      $buttons.append($answerButton);
      $answerButton.addEventListener("click", function(e){
        if(e.target.textContent === correctAnswer){
          e.target.style.backgroundColor = 'green';
          score++;
        } else {
          e.target.style.backgroundColor = 'red';
          var $p = document.createElement('p');
          $p.textContent = `The correct answer was ${correctAnswer}.`
          $buttons.append($p);
        }
      })
    }
})

xhr.send();
}



$startButton.addEventListener('click', startGame);

function quizQuestion(){
  $text.textContent = data[i].question;
  $username.textContent = '';
  $inputName.style.display = 'none';
}
