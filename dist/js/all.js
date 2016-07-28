// Create an account in Firebase
function firebaseCreate(firebaseEmail, firebasePassword) {
  var email = firebaseEmail;
  var password = firebasePassword;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
};

// Sign in an account
// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

// Sign out an account
// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }, function(error) {
//   // An error happened.
// });

// Add a placeholder event //

var eventPlaceholder = {
  name: 'Nanodegree Alumni Bash',
  location: 'Impasse de la Fidélité 4, 1000 Bruxelles, Belgium',
  type: 'Web',
  dateTime: 'July 30, 9pm-12am',
  host: 'Dan Denney',
  description: 'This is a placeholder event description.'
}

function createPlaceholder () {

  // Add name
  var placeholderName = document.querySelector('#placeholder-name');
  placeholderName.innerHTML = eventPlaceholder.name;

  // Add location
  var placeholderLocation = document.querySelector('#placeholder-location');
  placeholderLocation.innerHTML = eventPlaceholder.location;

  // Add type
  var placeholderType = document.querySelector('#placeholder-type');
  placeholderType.innerHTML = eventPlaceholder.type;

  // Add dateTime
  var placeholderDateTime = document.querySelector('#placeholder-dateTime');
  placeholderDateTime.innerHTML = eventPlaceholder.dateTime;

  // Add host
  var placeholderHost = document.querySelector('#placeholder-host');
  placeholderHost.innerHTML = eventPlaceholder.host;

  // Add description
  var placeholderDescription = document.querySelector('#placeholder-description');
  placeholderDescription.innerHTML = eventPlaceholder.description;

}

createPlaceholder();

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
  var accountName = document.querySelector('#your-name');
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

    // Check password and other inputs for validity
    if (firstPassword.length >= 8 && firstPassword.match(/[A-Z]/g) && firstPassword.match(/\d/g) && accountName.validity.valid && accountEmail.validity.valid) {
      return true;
    } else {
      return false;
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
  //   Form Submission
  // -------------------------------------

  function accountSubmit() {
    event.preventDefault();
    var firebaseEmail = accountEmail.value;
    var firebasePassword = accountPassword.value;
    checkPassword();
    firebaseCreate(firebaseEmail, firebasePassword);
    accountForm.reset();
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

validation();
