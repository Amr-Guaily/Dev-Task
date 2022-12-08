let id = (id) => document.getElementById(id);

// Selectors
let username = id('username'),
  email = id('email'),
  password = id('password'),
  confirmPassword = id('confirmPassword');

let form = document.querySelector('form');
let errorDivs = document.getElementsByClassName('error'),
  success = document.querySelector('.success');

// Global Variables
let isValidForm = true;

// Functions
function isValidEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
function emailValidation() {
  if (isValidEmail(email.value)) {
    isValidForm = true;
  } else if (email.value.trim() === '') {
    setError(email, 1, "Email can't be a blank..");
  } else {
    setError(email, 1, 'please enter a vaild email..');
  }
}
function usernameValidation() {
  var regex = /^[a-zA-Z0-9]{5,15}$/;
  if (regex.test(username.value)) {
    isValidForm = true;
  } else {
    setError(username, 0, 'Please enter a valid username..');
  }
}
function passwordValidation() {
  if (password.value.length < 8) {
    setError(password, 2, 'Password must be at least 8 characters');
  } else if (password.value !== confirmPassword.value) {
    setError(confirmPassword, 3, "password didn't match...");
  } else {
    isValidForm = true;
  }
}
function setError(input, idx, mesg) {
  isValidForm = false;
  input.style.border = '2px solid red';
  errorDivs[idx].textContent = mesg;
}
function submitHandler(e) {
  e.preventDefault();

  // Form Validation
  usernameValidation();
  emailValidation();
  passwordValidation();

  // If validation passed successfully, then collect form data and send post req to an API
  if (isValidForm) {
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    // send Post Request
    fetch('https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-Type': 'application/json',
      },
    }).then(() => {
      // successfully Signed up, then navigate to home page and store user data in local storage
      localStorage.setItem(
        'userData',
        JSON.stringify({ username: username.value, email: email.value })
      );
      window.location = './home.html';
    });
  }
}

// Events
form.addEventListener('submit', (e) => submitHandler(e));
