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
