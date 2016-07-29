// *************************************
//
//   Authentication in Firebase
//   -> Form handling and data get/send
//
// *************************************

function changeSection() {

  // Get all elements that have validity classes
  var openCreateAccount = document.querySelector('#js-openCreateAccount');
  var openEvents = document.querySelector('#js-openEvents');
  var openCreateEvent = document.querySelector('#js-openCreateEvent');
  var createAccount = document.querySelector('#create-account');
  var events = document.querySelector('#events');
  var createEvent = document.querySelector('#create-event');

  // Remove showing class
  function clearShowing() {
    var isActive = document.querySelector('.is-showing');
    isActive.classList.remove('is-showing');
  };

  // Add showing class to create account
  openCreateAccount.addEventListener('click', function(event) {
    clearShowing();
    createAccount.classList.add('is-showing');
  }, false);

  // Add showing class to events
  openEvents.addEventListener('click', function(event) {
    clearShowing();
    events.classList.add('is-showing');
  }, false);

  // Add showing class to events
  openCreateEvent.addEventListener('click', function(event) {
    clearShowing();
    createEvent.classList.add('is-showing');
  }, false);

};

changeSection();



// Create an account in Firebase
function firebaseCreate(firebaseEmail, firebasePassword) {

  // Create the account
  var email = firebaseEmail;
  var password = firebasePassword;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

};

// Watch for auth state changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.querySelector('body').classList.add('is-signedIn');
    user.sendEmailVerification();
  } else {
    console.log("it's a ghost town up in here");
  }
});

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
  var accountForm = document.querySelector('#js-form-account');
  var hasValidation = document.querySelectorAll('.has-validation');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // Blur on inputs
  hasValidation.forEach(function(validationItem) {
    validationItem.addEventListener('blur', function(event) {
      this.classList.add('is-active');
    }, true);
  });

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
  //   Visual Feedback
  // -------------------------------------

  function clearForm() {

    // Get all elements that have validity classes
    var hasValid = document.getElementsByClassName('is-valid');
    var hasInvalid = document.getElementsByClassName('is-invalid');
    var hasActive = document.getElementsByClassName('is-active');

    // Remove validity classes
    while (hasValid.length)
      hasValid[0].classList.remove('is-valid');
    while (hasInvalid.length)
      hasInvalid[0].classList.remove('is-invalid');

    // Remove active classes
    while (hasActive.length)
      hasActive[0].classList.remove('is-active');

  };

  // -------------------------------------
  //   Form Submission
  // -------------------------------------

  function accountSubmit() {
    // Prevent form submission
    event.preventDefault();

    // Get values for Firebase
    var firebaseEmail = accountEmail.value;
    var firebasePassword = accountPassword.value;

    // Check password requirements
    checkPassword();

    // Create account in Firebase
    firebaseCreate(firebaseEmail, firebasePassword);

    // Reset the form and clear feedback
    accountForm.reset();
    clearForm();
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

validation();
