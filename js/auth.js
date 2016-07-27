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
