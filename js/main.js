const $username = document.querySelector('h1');
const $text = document.querySelector('h3');
const $form = document.querySelector('#form');
const $inputName = document.querySelector('#input-name');
const $enterButton = document.querySelector('#enter-button');
const $startButton = document.querySelector('#start-button');
const $buttons = document.querySelectorAll('button');
const $answerButtons = document.querySelector('.buttons');
const $p = document.querySelector('p');
const $score = document.querySelector('span');
const $body = document.querySelector('div');
const $main = document.querySelector('main');

const changeName = (e) => {
  if($inputName.value <= 0){
    $username.textContent = `We need a name to play the game...`;
  } else {
    $username.textContent = `${$inputName.value} ,`;
    $text.textContent = `ready to test your knowledge on earthly things?`;
    $inputName.classList.add('hidden');
    $enterButton.classList.add('hidden');
    $startButton.classList.remove('hidden');
    userData.username = $inputName.value;
  }
}

$enterButton.addEventListener('click', changeName);

let count = 11;
let score = 0;
const $restart = document.createElement('button');
$restart.className = 'play-again';
$restart.textContent = 'Play Again';

const startGame = (e) => {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');

  xhr.responseType = 'json';

  count--;

  xhr.addEventListener('load', () => {
  let xhrResponse = xhr.response;
  let data = xhrResponse.results;
  let answers = [];
  let unfilteredCorrectAnswer = '';

    for (let i = 0; i < data.length; i++) {
      $text.innerHTML = data[i].question;
      $startButton.value = 'Next';
      unfilteredCorrectAnswer = data[i].correct_answer;
      const filteredCorrectAnswer = document.createElement('p');
      filteredCorrectAnswer.innerHTML = unfilteredCorrectAnswer;
      const correctAnswer = filteredCorrectAnswer.textContent;
      answers = (data[i].incorrect_answers);
      answers.push(correctAnswer);
      answers.sort();
      $buttons.forEach((elem) => {
        elem.classList.remove('hidden');
      })
      $p.classList.remove('hidden');
      $buttons[0].innerHTML = answers[0];
      $buttons[1].innerHTML = answers[1];
      $buttons[2].innerHTML = answers[2];
      $buttons[3].innerHTML = answers[3];

      e.target.addEventListener('click', (e) => {
        $buttons.forEach((elem) => {
          if (elem.textContent === correctAnswer){
            elem.className = 'green';
          }
        })
      })
      $buttons.forEach((elem) => {
        elem.addEventListener("click", (e) => {
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
      $buttons.forEach((elem) => {
        elem.className ='gray';
      })

    }

    if (count < 1){
      $username.textContent = `Welldone, ${$inputName.value}!`;
      $buttons.forEach((elem) => {
        elem.classList.add('hidden');
      })
      $startButton.classList.add('hidden');
      if (score < 5){
        $text.textContent = `But you still need a course in Earthly 101.`;
      } else if (score > 4 && score < 7){
        $text.textContent = `You've got a pretty good knowledge of Earthly things!`;
      } else if (score > 7){
        $text.textContent = `We are in awe of your knowledge!`;
      }
      const total = 10;
      $p.textContent = `You got ${score} of ${total} correctly.`;
      $score.className = 'hidden';
      $body.append($restart);
    }
  })

xhr.send();
}

let counter = 11;
let scorer = 0;

$restart.addEventListener('click', (e) => {
  counter = 10;
  scorer = 0;
  while ($main.firstChild) {
    $main.removeChild($main.firstChild);
  }
  const container = document.createElement('div');
  container.className = 'container';

  const h1 = document.createElement('h1');
  h1.textContent = userData.username + ',';

  const span = document.createElement('span');
  span.className = 'hidden';
  span.textContent = 'Score: 0';

  const h3 = document.createElement('h3');
  h3.textContent = `ready to test your knowledge on earthly things?`;

  const div1 = document.createElement('div');
  const input1 = document.createElement("INPUT");
  input1.className = 'hidden';
  input1.id = 'input-name';
  input1.setAttribute("type", "text");
  input1.setAttribute("placeholder", "Name goes here...");
  div1.append(input1);

  const div2 = document.createElement('div');
  const input2 = document.createElement("INPUT");
  input2.id = 'enter-button';
  input2.className = 'hidden';
  input2.setAttribute("type", "submit");
  input2.setAttribute("value", "Enter...");
  div2.append(input2);

  const div3 = document.createElement('div');
  div3.className = 'buttons';
  const button1 = document.createElement('button');
  button1.className = 'hidden';
  const button2 = document.createElement('button');
  button2.className = 'hidden';
  const button3 = document.createElement('button');
  button3.className = 'hidden';
  const button4 = document.createElement('button');
  button4.className = 'hidden';
  const p = document.createElement('p');
  p.className = 'hidden';
  div3.append(button1, button2, button3, button4, p);

  const div4 = document.createElement('div');
  const input3 = document.createElement("INPUT");
  input3.id = 'start-button';
  input3.setAttribute("type", "submit");
  input3.setAttribute("value", "Start Now");
  div4.append(input3);

  container.append(h1, span, h3, div1, div2, div3, div4);
  $main.append(container);

  input3.addEventListener('click', (e) => {
    const buttonArr = [];

    buttonArr.push(button1);
    buttonArr.push(button2);
    buttonArr.push(button3);
    buttonArr.push(button4);

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple');

    xhr.responseType = 'json';

    counter--;

    xhr.addEventListener('load', () => {
      let xhrResponse = xhr.response;
      let data = xhrResponse.results;
      let answers = [];
      let unfilteredCorrectAnswer = '';

      for (let i = 0; i < data.length; i++) {
        h3.innerHTML = data[i].question;
        input3.value = 'Next';
        unfilteredCorrectAnswer = data[i].correct_answer;
        const filteredCorrectAnswer = document.createElement('p');
        filteredCorrectAnswer.innerHTML = unfilteredCorrectAnswer;
        const correctAnswer = filteredCorrectAnswer.textContent;
        answers = (data[i].incorrect_answers);
        answers.push(correctAnswer);
        answers.sort();
        buttonArr.forEach((button) => {
          button.classList.remove('hidden');
        })
        p.classList.remove('hidden');
        button1.innerHTML = answers[0];
        button2.innerHTML = answers[1];
        button3.innerHTML = answers[2];
        button4.innerHTML = answers[3];

        e.target.addEventListener('click', (e) => {
          buttonArr.forEach((button) => {
            if (button.textContent === correctAnswer) {
              button.className = 'green';
            }
          })
        })

        buttonArr.forEach((button) => {
          button.addEventListener("click", (e) => {
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
        buttonArr.forEach((button) => {
          button.className = 'gray';
        })
      }

      if (counter < 1) {
        h1.textContent = `Welldone, ${userData.username}!`;
        buttonArr.forEach((button) => {
          button.classList.add('hidden');
        })
        input3.classList.add('hidden');
        if (scorer < 5) {
          h3.textContent = `But you still need a course in Earthly 101.`;
        } else if (scorer > 4 && score < 7) {
          h3.textContent = `You've got a pretty good knowledge of Earthly things!`;
        } else if (scorer > 7) {
          h3.textContent = `We are in awe of your knowledge!`;
        }
        const total = 10;
        p.textContent = `You got ${scorer} of ${total} correctly.`;
        span.className = 'hidden';
        $main.append($restart);
      }
    })

    xhr.send();
  });
});

$startButton.addEventListener('click', startGame);
