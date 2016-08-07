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
//   Initialize
// -------------------------------------

firebaseAuth();
firebaseSignIn();
