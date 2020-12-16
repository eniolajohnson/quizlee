var $username = document.querySelector('h1');
var $text = document.querySelector('h3');
var $inputName = document.querySelector('#input-name');
var $submitButton = document.querySelector('#submit-button');


function changeName(e) {
  if($inputName.value <= 0){
    $username.textContent = 'We need a name to play the game...';
  } else {
    $username.textContent = $inputName.value + ',';
    $text.textContent = 'ready to test your knowledge on earthly things?';
    $submitButton.value = 'Start Now';
    $inputName.style.display = 'none';
  }
}

$submitButton.addEventListener('click', changeName);
