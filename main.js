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
    setError(email, "Email can't be a blank..");
  } else {
    setError(email, 'please enter a vaild email..');
  }
}
function usernameValidation() {
  var regex = /^[a-zA-Z0-9]{5,15}$/;
  if (regex.test(username.value)) {
    isValidForm = true;
  } else {
    setError(username, 'Please enter a valid username..');
  }
}
function passwordValidation() {
  if (password.value.length < 8) {
    setError(password, 'Password must be at least 8 characters');
  } else if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "password didn't match...");
  } else {
    isValidForm = true;
  }
}
function setError(input, mesg) {
  console.log(input);
  isValidForm = false;
  input.style.border = '2px solid red';

  if (input.id === 'username') errorDivs[0].textContent = mesg;
  if (input.id === 'email') errorDivs[1].textContent = mesg;
  if (input.id === 'password') errorDivs[2].textContent = mesg;
  if (input.id === 'ConfirmPassword') errorDivs[3].textContent = mesg;
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
      password_confirmation: confirmPassword.value,
    };
    // send Post Request
    fetch('https://goldblv.com/api/hiring/tasks/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        // Check response.ok
        if (res.ok) {
          return res.json();
        }
        // reject if not OK, instead of throw an error
        return Promise.reject(res);
      })
      .then((data) => {
        // successfully Signed up, then navigate to home page and store user data in local storage
        localStorage.setItem('userData', JSON.stringify(data));
        window.location = './home.html';
      })
      .catch((res) => {
        console.log(res.status, res.statusText);
        // get error message, if any
        res.json().then(({ errors }) => serverErrorHandler(errors));
      });
  }
}
function serverErrorHandler(errors) {
  [0, 1, 2, 3].forEach((itm) => (errorDivs[itm].textContent = ''));

  let keys = Object.keys(errors);
  keys.forEach((key) => {
    // Select error input
    let input = id(key);
    setError(input, errors[key][0]);
    input.style.border = '2px solid red';

    let allInputs = document.querySelectorAll('input');
    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].style.border = '2px solid green';
    }
  });
}
// Events
form.addEventListener('submit', (e) => submitHandler(e));
