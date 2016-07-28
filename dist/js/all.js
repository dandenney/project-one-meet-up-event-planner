// Create an account in Firebase
function firebaseCreate() {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

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

// // Global Variables please work //
var accountEmail = document.querySelector('#your-email');
var firstPasswordInput = document.querySelector('#your-password');
var accountCreate = document.querySelector('#account-create');

// Check Requirements //
function checkRequirements() {

  var firstPassword = firstPasswordInput.value;
  var characterMessage = document.querySelector('.js-require-characters');
  var capitalMessage = document.querySelector('.js-require-capital');
  var numberMessage = document.querySelector('.js-require-number');

  // Check Password Length
  if (firstPassword.length < 8) {
    characterMessage.classList.remove('is-valid');
    characterMessage.classList.add('is-invalid');
  } else {
    characterMessage.classList.remove('is-invalid');
    characterMessage.classList.add('is-valid');
  }

  if (!firstPassword.match(/[A-Z]/g)) {
    capitalMessage.classList.remove('is-valid');
    capitalMessage.classList.add('is-invalid');
  } else {
    capitalMessage.classList.remove('is-invalid');
    capitalMessage.classList.add('is-valid');
  }

  if (!firstPassword.match(/\d/g)) {
    numberMessage.classList.remove('is-valid');
    numberMessage.classList.add('is-invalid');
  } else {
    numberMessage.classList.remove('is-invalid');
    numberMessage.classList.add('is-valid');
  }

  console.clear();

  if (firstPassword.length >= 8 && firstPassword.match(/[A-Z]/g) && firstPassword.match(/\d/g)) {
    console.log('valid');
  } else {
    console.log('invalid');
  }

};

firstPasswordInput.addEventListener('focus', function(event) {
  firstPasswordInput.classList.remove('is-valid');
  firstPasswordInput.classList.remove('is-invalid');
}, true);

firstPasswordInput.addEventListener('keyup', function(event) {
  checkRequirements();
}, true);

var formAccount = document.querySelector('.js-form-account');
formAccount.addEventListener('submit', function(event) {
  event.preventDefault();
  var email = accountEmail.value;
  var password = firstPasswordInput.value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}, true);

// Initialize on Submit

accountCreate.onclick = function () {
  checkRequirements();
};
