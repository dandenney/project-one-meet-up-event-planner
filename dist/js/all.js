// *************************************
//
// ## Authentication in Firebase
// -> Form handling and data get/send
//
// *************************************

// -------------------------------------
// ## Firebase Create Account
// -------------------------------------

// Create an account in Firebase
function firebaseCreate(firebaseName, firebaseEmail, firebasePassword) {

  // -------------------------------------
  // ## Private Variables
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
      // Route to events
      routeEvents();

    }, function(error) {
      console.log('Adding your account failed. Please try again.');
    });
  });

  // Add auth class to body
  authFeedback();

};

// -------------------------------------
// ## Firebase Authorization
// -------------------------------------

function firebaseAuth() {

  var signInOut = document.querySelector('#js-signInOutAccount');
  var signInOutText = document.querySelector('#js-signInOutText');

  // Check for a signed in user
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      console.log(user.email + " is signed in");
      signInOutText.innerHTML = 'Out';

      // Add auth class to body
      authFeedback();

      // Route to events
      routeEvents();

      // Keyup on account password
      signInOut.addEventListener('click', function(event) {
        firebaseSignOut();
      }, true);

    } else {
      signInOutText.innerHTML = 'In';
    }

  });

};

// -------------------------------------
// ## Firebase Sign In
// -------------------------------------

function firebaseSignIn() {

  // -------------------------------------
  // ## Private Variables
  // -------------------------------------

  var accountSignIn = document.querySelector('#account-signIn');

  // -------------------------------------
  // ## Event Listeners
  // -------------------------------------

  accountSignIn.addEventListener('click', function(event) {

    // -------------------------------------
    // ## Private Variables
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
// ## Firebase Sign Out
// -------------------------------------

function firebaseSignOut() {

  var appBody = document.querySelector('.body');
  appBody.classList.remove('is-signedIn');

  // Sign out an account
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });

};

// -------------------------------------
// ## Auth Feedback
// Add a class to the body for UI controls
// -------------------------------------

function authFeedback() {
  var appBody = document.querySelector('.body');
  appBody.classList.add('is-signedIn');
};

// -------------------------------------
// ## Initialize
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
//   Create an Event
// -------------------------------------

function createEvent() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var eventCreateForm = document.querySelector('#js-form-event');
  var eventNameInput = document.querySelector('#event-name');
  var eventHostInput = document.querySelector('#event-host');
  var eventTypeInput = document.querySelector('#event-type');
  var eventBeginInput = document.querySelector('#event-begin');
  var eventEndInput = document.querySelector('#event-end');
  var eventDescriptionInput = document.querySelector('#event-description');
  var eventCreateInput = document.querySelector('#event-create');
  var eventListRef = firebase.database().ref('events');
  var newListRef = eventListRef.push();

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  eventCreateInput.addEventListener('click', function() {
    eventSubmit();
  });

  eventBeginInput.addEventListener('blur', function() {
    populateEnds()
  });

  // -------------------------------------
  //   Populate Ends
  // -------------------------------------

  function populateEnds() {
    var beginVal = eventBeginInput.value;
    eventEndInput.value = beginVal;
  }

  // -------------------------------------
  //   Event Submit
  // -------------------------------------

  function eventSubmit() {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var eventName = eventNameInput.value;
    var eventHost = eventHostInput.value;
    var eventType = eventTypeInput.value;
    var eventBegin = eventBeginInput.value;
    var eventEnd = eventEndInput.value;
    var eventDescription = eventDescriptionInput.value;

    // -------------------------------------
    //   Validate Event Inputs
    // -------------------------------------

    if (

      eventNameInput.validity.valid &&
      eventHostInput.validity.valid &&
      eventTypeInput.validity.valid &&
      eventBeginInput.validity.valid &&
      eventEndInput.validity.valid

    ) {

      // -------------------------------------
      //   Set in Firebase
      // -------------------------------------
      newListRef.set({
        'eventName': eventName,
        'eventHost': eventHost,
        'eventType': eventType,
        'eventBegin': eventBegin,
        'eventEnd': eventEnd,
        'eventDescription': eventDescription
      });

    } else {
      alert('invalid');
    }

  }

}

// -------------------------------------
//   Retrieve Events
// -------------------------------------

function retrieveEvents() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var eventsRef = firebase.database().ref('events').orderByKey();
  var eventsContainer = document.querySelector('#all-events');

  // -------------------------------------
  //   Retrieve from Firebase
  // -------------------------------------

  eventsRef.on('value', function(snap) {
    snap.forEach(function(childSnap) {

      // Retrieve
      var event = childSnap.val();

      // This all should be in outputEvents();

      // Event container
      var eventContainer = document.createElement('article');
      eventContainer.className = 'card event';
      // Event Name
      var eventNameContainer = document.createElement('h3');
      eventNameContainer.className = 'event-name';
      var outputName = document.createTextNode(event.eventName);
      // Event Host
      var eventHostContainer = document.createElement('p');
      eventHostContainer.className = 'event-host';
      var outputHost = document.createTextNode(event.eventHost);
      // Event Type
      var eventTypeContainer = document.createElement('p');
      eventTypeContainer.className = 'event-type';
      var outputType = document.createTextNode(event.eventType);
      // Event Begin
      var eventBeginContainer = document.createElement('p');
      eventBeginContainer.className = 'event-begin';
      var outputBegin = document.createTextNode(event.eventBegin);
      // Event End
      var eventEndContainer = document.createElement('p');
      eventEndContainer.className = 'event-end';
      var outputEnd = document.createTextNode(event.eventEnd);
      // Event Description
      var eventDescriptionContainer = document.createElement('p');
      eventDescriptionContainer.className = 'event-description';
      var outputDescription = document.createTextNode(event.eventDescription);

      eventsContainer.appendChild(eventContainer);
      eventContainer.appendChild(eventNameContainer);
      eventContainer.appendChild(eventHostContainer);
      eventContainer.appendChild(eventTypeContainer);
      eventContainer.appendChild(eventBeginContainer);
      eventContainer.appendChild(eventEndContainer);
      eventContainer.appendChild(eventDescriptionContainer);
      eventNameContainer.appendChild(outputName);
      eventHostContainer.appendChild(outputHost);
      eventTypeContainer.appendChild(outputType);
      eventBeginContainer.appendChild(outputBegin);
      eventEndContainer.appendChild(outputEnd);
      eventDescriptionContainer.appendChild(outputDescription);

      // Route to events
      routeEvents();

    });
  });

}

// -------------------------------------
//   Output Events
// -------------------------------------

// function outputEvents () {
//
//   // I want this to hold output methods
//
// }

// -------------------------------------
//   # Route Events
// -------------------------------------

function routeEvents () {
  window.location = '/#events';
}

// -------------------------------------
//   Initializers
// -------------------------------------

createEvent();
retrieveEvents();

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
