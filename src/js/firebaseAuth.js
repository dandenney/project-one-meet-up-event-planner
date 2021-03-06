// *************************************
//
//   Component Name
//   -> Firebase is initialized before all.js
//   -> Firebase tasks are initialized here
//
// *************************************

// -------------------------------------
//  Firebase Create Account
// -------------------------------------

// Create an account in Firebase
function firebaseCreate(firebaseEmail, firebasePassword) {

  var elCreateMessage = document.querySelector('#feedback-create');

  // Firebase's event watcher for creating an account
  firebase.auth().createUserWithEmailAndPassword(firebaseEmail, firebasePassword).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    elCreateMessage.innerHTML = error.message;
    elCreateMessage.classList.add('is-failing');
    elCreateMessage.classList.add('is-visible');

  });

  // Add auth class to body
  authFeedback();

  // Update global for new user
  isNewUser = true;

};

// -------------------------------------
//  Firebase Current User
// -------------------------------------

// Firebase's event watcher for auth changes
firebase.auth().onAuthStateChanged(function(user) {

  var signInOut = document.querySelector('#nav-auth');

  // Add attendees to events
  addAttendee();

  if (user) {

    // Update current user ID
    currentUserId = user.uid;

    // Update the UI
    authFeedback(user);

    // If its a new user, add to users database
    if (isNewUser === true) {

      createUser();

    } else {

      lookupUser();
      attendingFeedback();

    }

    // Route to events
    routeEvents();

    // Keyup on account password
    signInOut.addEventListener('click', function(event) {
      firebaseSignOut();
    }, true);

  }

});

// -------------------------------------
//  Firebase Sign In
// -------------------------------------

function firebaseSignIn() {

  // -------------------------------------
  //  Private Variables
  // -------------------------------------

  var accountSignIn = document.querySelector('#account-signIn');

  // -------------------------------------
  //  Event Listeners
  // -------------------------------------

  accountSignIn.addEventListener('click', function(event) {

    // If the page refreshes, it interrupts Firebase
    event.preventDefault();

    // -------------------------------------
    //  Private Variables
    // -------------------------------------

    var signInEmailInput = document.querySelector('#auth-email');
    var signInPasswordInput = document.querySelector('#auth-password');
    var signInEmail = signInEmailInput.value;
    var signInPassword = signInPasswordInput.value;
    var authForm = document.querySelector('#form-auth');
    var elAuthMessage = document.querySelector('#feedback-auth');

    // Firebase's event watcher for signing in
    firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      elAuthMessage.innerHTML = error.message;
      elAuthMessage.classList.add('is-failing');
      elAuthMessage.classList.add('is-visible');

    });

    // A user that signs in isn't new
    isNewUser = false;

  });

};

// -------------------------------------
//  Firebase Sign Out
// -------------------------------------

function firebaseSignOut() {

  var appBody = document.querySelector('.body');
  appBody.classList.remove('is-signedIn');

  // Sign out an account
  firebase.auth().signOut().then(function() {

    var signInOutText = document.querySelector('#signInOutText');
    signInOutText.innerHTML = 'In';

    // Sledgehammer solution
    // Sign out/in overwrites the most recent event
    // Forcing a page refresh clears the session
    setTimeout(function(){
      window.location.reload();
    },100);

  }, function(error) {

  });

  // Clear current user values
  currentUserId     = '';
  currentUserName   = '';
  currentUserTitle  = '';
  isNewUser         = false;

};

// -------------------------------------
//  Auth Feedback
// Add a class to the body for UI controls
// -------------------------------------

function authFeedback(user) {

  var signInOutText = document.querySelector('#signInOutText');
  var appBody = document.querySelector('.body');

  if (user) {

    // A body class is used for feedback on elements
    appBody.classList.add('is-signedIn');

    // Change copy for signing out
    signInOutText.innerHTML = 'Out';

  }

};

function resetPassword() {

  // -------------------------------------
  //  Private Variables
  // -------------------------------------

  var forgotPasswordSubmit = document.querySelector('#account-forgot');
  var emailAddressInput = document.querySelector('#forgot-email');

  // -------------------------------------
  //  Event Listeners
  // -------------------------------------

  forgotPasswordSubmit.addEventListener('click', function(event) {

    // If the page refreshes, it interrupts Firebase
    event.preventDefault();
    var emailAddress = emailAddressInput.value;

    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
      window.location = '/#auth-account';
    }, function(error) {

    });

  });

}

// -------------------------------------
//   Initializers
// -------------------------------------

firebaseSignIn();
resetPassword();
