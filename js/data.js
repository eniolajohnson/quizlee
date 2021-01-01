/* exported data */
const userData = {
  username : "",
}

const userDataJSON = JSON.stringify(userData)
localStorage.setItem('userData', userDataJSON);
