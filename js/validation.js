// *************************************
//
//   Form Validation
//   -> Validation and submission of forms
//
// *************************************

function validation() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------
  var accountEmail = document.querySelector('#your-email');
  var accountPassword = document.querySelector('#your-password');
  var accountCreate = document.querySelector('#account-create');
  var accountForm = document.querySelector('.js-form-account');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // Focus on account password
  accountPassword.addEventListener('focus', function(event) {
    clearFeedback();
  }, true);

  // Keyup on account password
  accountPassword.addEventListener('keyup', function(event) {
    checkPassword();
  }, true);

  // Submit of account form
  accountForm.addEventListener('submit', function(event) {
    accountSubmit();
  }, true);

  // -------------------------------------
  //   Password Validation
  // -------------------------------------

  function checkPassword() {

    // Private Variables
    var firstPassword = accountPassword.value;
    var characterMessage = document.querySelector('.js-require-characters');
    var capitalMessage = document.querySelector('.js-require-capital');
    var numberMessage = document.querySelector('.js-require-number');

    // Apply validity classes for length
    if (firstPassword.length < 8) {
      characterMessage.classList.remove('is-valid');
      characterMessage.classList.add('is-invalid');
    } else {
      characterMessage.classList.remove('is-invalid');
      characterMessage.classList.add('is-valid');
    }

    // Apply validity classes for required capital letter
    if (!firstPassword.match(/[A-Z]/g)) {
      capitalMessage.classList.remove('is-valid');
      capitalMessage.classList.add('is-invalid');
    } else {
      capitalMessage.classList.remove('is-invalid');
      capitalMessage.classList.add('is-valid');
    }

    // Apply validity classes for required number
    if (!firstPassword.match(/\d/g)) {
      numberMessage.classList.remove('is-valid');
      numberMessage.classList.add('is-invalid');
    } else {
      numberMessage.classList.remove('is-invalid');
      numberMessage.classList.add('is-valid');
    }

  };

  // -------------------------------------
  //   Clear Feedback
  // -------------------------------------

  function clearFeedback() {
    accountPassword.classList.remove('is-valid');
    accountPassword.classList.remove('is-invalid');
  };

  // -------------------------------------
  //   Account Submit
  // -------------------------------------

  function accountSubmit() {
    event.preventDefault();
    var email = accountEmail.value;
    var password = accountPassword.value;
    firebaseCreate(); // auth.js
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

validation();

// if (firstPassword.length >= 8 && firstPassword.match(/[A-Z]/g) && firstPassword.match(/\d/g)) {
//   console.log('valid');
// } else {
//   console.log('invalid');
// }
