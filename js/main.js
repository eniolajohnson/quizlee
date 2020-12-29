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
var $body = document.querySelector('div');
var $main = document.querySelector('main');

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
var $restart = document.createElement('button');
$restart.className = 'play-again';
$restart.textContent = 'Play Again';

function startGame(e){
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');

  xhr.responseType = 'json';

  count--;

  xhr.addEventListener('load', function () {
  var xhrResponse = xhr.response;
  var data = xhrResponse.results;
  var answers = [];
  var unfilteredCorrectAnswer = '';

    for (var i = 0; i < data.length; i++) {
      $text.innerHTML = data[i].question;
      $startButton.value = 'Next';
      unfilteredCorrectAnswer = data[i].correct_answer;
      var filteredCorrectAnswer = document.createElement('p');
      filteredCorrectAnswer.innerHTML = unfilteredCorrectAnswer;
      var correctAnswer = filteredCorrectAnswer.textContent;
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

      e.target.addEventListener('click', function(e){
        $buttons.forEach(function(elem) {
          if (elem.textContent === correctAnswer){
            elem.className = 'green'
          }
        })
      })
      $buttons.forEach(function(elem){
        elem.addEventListener("click", function (e) {
          if (e.target.textContent === correctAnswer) {
            score++;
            e.target.className = 'green';
            $p.textContent = '';
          } else if (e.target.textContent !== correctAnswer) {
            e.target.className = 'red';
            $p.textContent = `The correct answer was: ${correctAnswer}.`;
          } else {
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
      $score.className = 'hidden';
      $body.append($restart);
    }
  })

xhr.send();
}

var counter = 11;
var scorer = 0;

$restart.addEventListener('click', function(e) {
  counter = 10;
  scorer = 0;
  while ($main.firstChild) {
    $main.removeChild($main.firstChild);
  }
  var container = document.createElement('div');
  container.className = 'container';

  var h1 = document.createElement('h1');
  h1.textContent = userData.username + ',';

  var span = document.createElement('span');
  span.className = 'hidden';
  span.textContent = 'Score: 0';

  var h3 = document.createElement('h3');
  h3.textContent = 'ready to test your knowledge on earthly things?';

  var div1 = document.createElement('div');
  var input1 = document.createElement("INPUT");
  input1.className = 'hidden';
  input1.id = 'input-name';
  input1.setAttribute("type", "text");
  input1.setAttribute("placeholder", "Name goes here...");
  div1.append(input1);

  var div2 = document.createElement('div');
  var input2 = document.createElement("INPUT");
  input2.id = 'enter-button';
  input2.className = 'hidden';
  input2.setAttribute("type", "submit");
  input2.setAttribute("value", "Enter...");
  div2.append(input2);

  var div3 = document.createElement('div');
  div3.className = 'buttons';
  var button1 = document.createElement('button');
  button1.className = 'hidden';
  var button2 = document.createElement('button');
  button2.className = 'hidden';
  var button3 = document.createElement('button');
  button3.className = 'hidden';
  var button4 = document.createElement('button');
  button4.className = 'hidden';
  var p = document.createElement('p');
  p.className = 'hidden';
  div3.append(button1, button2, button3, button4, p);

  var div4 = document.createElement('div');
  var input3 = document.createElement("INPUT");
  input3.id = 'start-button';
  input3.setAttribute("type", "submit");
  input3.setAttribute("value", "Start Now");
  div4.append(input3);

  container.append(h1, span, h3, div1, div2, div3, div4);
  $main.append(container);

  input3.addEventListener('click', function(e) {
    var buttonArr = [];

    buttonArr.push(button1);
    buttonArr.push(button2);
    buttonArr.push(button3);
    buttonArr.push(button4);

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');

    xhr.responseType = 'json';

    counter--;

    xhr.addEventListener('load', function () {
      var xhrResponse = xhr.response;
      var data = xhrResponse.results;
      var answers = [];
      var unfilteredCorrectAnswer = '';

      for (var i = 0; i < data.length; i++) {
        h3.innerHTML = data[i].question;
        input3.value = 'Next';
        unfilteredCorrectAnswer = data[i].correct_answer;
        var filteredCorrectAnswer = document.createElement('p');
        filteredCorrectAnswer.innerHTML = unfilteredCorrectAnswer;
        var correctAnswer = filteredCorrectAnswer.textContent;
        answers = (data[i].incorrect_answers);
        answers.push(correctAnswer);
        answers.sort();
        buttonArr.forEach(function (button) {
          button.classList.remove('hidden');
        })
        p.classList.remove('hidden');
        button1.innerHTML = answers[0];
        button2.innerHTML = answers[1];
        button3.innerHTML = answers[2];
        button4.innerHTML = answers[3];

        e.target.addEventListener('click', function (e) {
          buttonArr.forEach(function (button) {
            if (button.textContent === correctAnswer) {
              button.className = 'green'
            }
          })
        })

        buttonArr.forEach(function (button) {
          button.addEventListener("click", function (e) {
            if (e.target.textContent === correctAnswer) {
              scorer++;
              e.target.className = 'green';
              p.textContent = '';
            } else if (e.target.textContent !== correctAnswer) {
              e.target.className = 'red';
              p.textContent = `The correct answer was: ${correctAnswer}.`;
            }
          })
        })

        span.classList.remove('hidden');
        span.className = 'score';
        span.textContent = `Score: ${scorer}`;
        p.textContent = '';
        buttonArr.forEach(function (button) {
          button.className = 'gray';
        })
      }

      if (counter < 1) {
        h1.textContent = `Welldone, ${userData.username}!`;
        buttonArr.forEach(function (button) {
          button.classList.add('hidden');
        })
        input3.classList.add('hidden');
        if (scorer < 5) {
          h3.textContent = `But you still need a course in Earthly 101.`
        } else if (scorer > 5 && score < 7) {
          h3.textContent = `You've got a pretty good knowledge of Earthly things!`
        } else if (scorer > 7) {
          h3.textContent = `We are in awe of your knowledge!`
        }
        var total = 10;
        p.textContent = `You got ${score} of ${total} correctly.`;
        span.className = 'hidden';
        $main.append($restart);
      }
    })

    xhr.send();
  });
});

$startButton.addEventListener('click', startGame);
