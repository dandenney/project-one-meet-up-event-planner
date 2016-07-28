// Create an account in Firebase
function firebaseCreate() {

  var accountForm = document.querySelector('.js-form-account');

  // -------------------------------------
  //   Account Submit
  // -------------------------------------

  // function accountSubmit() {
  //   event.preventDefault();


    // var email = accountEmail.value;
    // var password = accountPassword.value;
    // console.log(email, password);
    // firebaseCreate(email, password); // auth.js
  // };





  // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });
}

firebaseCreate();

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
