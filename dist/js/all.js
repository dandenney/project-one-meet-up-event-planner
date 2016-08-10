// *************************************
//
//   Authentication in Firebase
//   -> Form handling and data get/send
//
// *************************************

// -------------------------------------
//   Firebase Create Account
// -------------------------------------

// Create an account in Firebase
function firebaseCreate(firebaseName, firebaseEmail, firebasePassword) {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------
  var name = firebaseName;
  var email = firebaseEmail;
  var password = firebasePassword;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

    console.log(display);

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

  firebase.auth().onAuthStateChanged(function(user) {
    user.sendEmailVerification();
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("displayName is " + user.displayName);
    }, function(error) {
      console.log(fucked);
    });
  });

  authFeedback();

};

// -------------------------------------
//   Firebase Authorization
// -------------------------------------

function firebaseAuth() {

  var signInOut = document.querySelector('#js-signInOutAccount');
  var signInOutText = document.querySelector('#js-signInOutText');

  // Check for a signed in user
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      console.log(user.email + " is signed in");
      signInOutText.innerHTML = 'Out';

      // Keyup on account password
      signInOut.addEventListener('click', function(event) {
        firebaseSignOut();
      }, true);

    } else {
      signInOutText.innerHTML = 'In';
    }

  });

  authFeedback();

};

// -------------------------------------
//   Firebase Sign In
// -------------------------------------

function firebaseSignIn() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var accountSignIn = document.querySelector('#account-signIn');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  accountSignIn.addEventListener('click', function(event) {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var signInEmailInput = document.querySelector('#auth-email');
    var signInPasswordInput = document.querySelector('#auth-password');
    var signInEmail = signInEmailInput.value;
    var signInPassword = signInPasswordInput.value;
    var authForm = document.querySelector('#js-form-auth');

    firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });

    authForm.reset();
    firebaseAuth();

  });

};

// -------------------------------------
//   Firebase Sign Out
// -------------------------------------

function firebaseSignOut() {

  // Sign out an account
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });

};

// -------------------------------------
//   Auth Feedback
// -------------------------------------

function authFeedback() {
  var appBody = document.querySelector('.body');
  appBody.classList.add('is-signedIn');
};

// -------------------------------------
//   Initialize
// -------------------------------------

firebaseAuth();
firebaseSignIn();

// *************************************
//
//   Events
//   -> Event creation and retrieval
//
// *************************************

// -------------------------------------
//   Create Event
// -------------------------------------

function createEvent() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var eventCreateForm = document.querySelector('#js-form-event');
  var eventNameInput = document.querySelector('#event-name');
  var eventTypeInput = document.querySelector('#event-type');
  var eventCreateInput = document.querySelector('#event-create');
  var eventListRef = firebase.database().ref('events');
  var newListRef = eventListRef.push();

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  eventCreateInput.addEventListener('click', function() {
    eventSubmit();
  });

  // -------------------------------------
  //   Event Submit
  // -------------------------------------

  function eventSubmit() {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var eventName = eventNameInput.value;
    var eventType = eventTypeInput.value;

    // -------------------------------------
    //   Set in Firebase
    // -------------------------------------

    newListRef.set({
      'eventName': eventName,
      'eventType': eventType
    });

    eventCreateForm.reset();

  }

}

function retrieveEvents() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var events = firebase.database().ref('events').orderByKey();

  // -------------------------------------
  //   Retrieve from Firebase
  // -------------------------------------

  events.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var event = childSnapshot.val();
      console.log(event);
    });
  });

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

// -------------------------------------
//   Initializers
// -------------------------------------

createEvent();
retrieveEvents();

// *************************************
//
//   Nav
//   -> Change sections via JavaScript
//
// *************************************

function changeSection() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var openCreateAccount = document.querySelector('#js-openCreateAccount');
  var createAccount = document.querySelector('#create-account');
  var openAuthAccount = document.querySelector('#js-signInOutAccount');
  var authAccount = document.querySelector('#auth-account');
  var openCreateEvent = document.querySelector('#js-openCreateEvent');
  var createEvent = document.querySelector('#create-event');
  var openEvents = document.querySelector('#js-openEvents');
  var events = document.querySelector('#events');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // Add showing class to create account
  openCreateAccount.addEventListener('click', function(event) {
    clearShowing();
    createAccount.classList.add('is-showing');
  }, false);

  // Add showing class to auth account
  openAuthAccount.addEventListener('click', function(event) {
    clearShowing();
    authAccount.classList.add('is-showing');
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

  // -------------------------------------
  //   Change Visible Section
  // -------------------------------------

  // Remove showing class
  function clearShowing() {
    var isActive = document.querySelector('.is-showing');
    isActive.classList.remove('is-showing');
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

changeSection();

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
    var firebaseName = accountName.value;
    var firebaseEmail = accountEmail.value;
    var firebasePassword = accountPassword.value;

    // Check password requirements
    checkPassword();

    // Create account in Firebase
    firebaseCreate(firebaseName, firebaseEmail, firebasePassword);

    // Reset the form and clear feedback
    accountForm.reset();
    clearForm();
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

validation();
