/* exported data */
var userData = {
  username : "",
}

var userDataJSON = JSON.stringify(userData)
localStorage.setItem('userData', userDataJSON);
