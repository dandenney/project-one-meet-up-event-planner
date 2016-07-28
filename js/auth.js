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

// Watch for auth state changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.querySelector('body').classList.add('is-signedIn');
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
