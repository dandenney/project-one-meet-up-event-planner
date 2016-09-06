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
function firebaseCreate(firebaseName, firebaseTitle, firebaseEmail, firebasePassword) {

  // -------------------------------------
  // ## Private Variables
  // -------------------------------------
  var name = firebaseName;
  var title = firebaseTitle;
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

    // -------------------------------------
    //  Private Variables
    // -------------------------------------

    var usersRef = firebase.database().ref('users/' + user.uid);

    // -------------------------------------
    //   Create in Firebase
    // -------------------------------------
    usersRef.set({
      'userName': name,
      'userTitle': title
    });

    user.sendEmailVerification();
  });

  // Add auth class to body
  authFeedback();

};

// -------------------------------------
// ## Firebase Authorization
// -------------------------------------

function firebaseAuth() {

  var signInOut = document.querySelector('#nav-auth');
  var signInOutText = document.querySelector('#js-signInOutText');

  // Check for a signed in user
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
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
    console.log('Sign-out successful.');
  }, function(error) {
    console.log('An error happened.');
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
