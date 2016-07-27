// // Global Variables please work //
var accountEmail = document.querySelector('#your-email');
var firstPasswordInput = document.querySelector('#your-password');
// var confirmPasswordInput = document.querySelector('#confirm-password');
// var accountCreate = document.querySelector('#account-create');
//
// // Check Requirements //
// function checkRequirements() {
//
//   var firstPassword = firstPasswordInput.value;
//   var characterMessage = document.querySelector('.js-require-characters');
//   var capitalMessage = document.querySelector('.js-require-capital');
//   var numberMessage = document.querySelector('.js-require-number');
//
//   // Check Password Length
//   if (firstPassword.length < 8) {
//     characterMessage.classList.remove('is-valid');
//     characterMessage.classList.add('is-invalid');
//   } else {
//     characterMessage.classList.remove('is-invalid');
//     characterMessage.classList.add('is-valid');
//   }
//
//   if (!firstPassword.match(/[A-Z]/g)) {
//     capitalMessage.classList.remove('is-valid');
//     capitalMessage.classList.add('is-invalid');
//   } else {
//     capitalMessage.classList.remove('is-invalid');
//     capitalMessage.classList.add('is-valid');
//   }
//
//   if (!firstPassword.match(/\d/g)) {
//     numberMessage.classList.remove('is-valid');
//     numberMessage.classList.add('is-invalid');
//   } else {
//     numberMessage.classList.remove('is-invalid');
//     numberMessage.classList.add('is-valid');
//   }
//
//   console.clear();
//
//   if (firstPassword.length >= 8 && firstPassword.match(/[A-Z]/g) && firstPassword.match(/\d/g)) {
//     console.log('valid');
//   } else {
//     console.log('invalid');
//   }
//
// };
//
// firstPasswordInput.addEventListener('focus', function(event) {
//   firstPasswordInput.classList.remove('is-valid');
//   firstPasswordInput.classList.remove('is-invalid');
// }, true);
//
// firstPasswordInput.addEventListener('keyup', function(event) {
//   checkRequirements();
// }, true);
//
// function comparePasswords() {
//
//   var firstPassword = firstPasswordInput.value;
//   var confirmPassword = confirmPasswordInput.value;
//
//   if (firstPassword === confirmPassword) {
//     confirmPasswordInput.classList.remove('is-invalid');
//     confirmPasswordInput.classList.add('is-valid');
//   } else {
//     confirmPasswordInput.classList.remove('is-valid');
//     confirmPasswordInput.classList.add('is-invalid');
//   }
//
// }
//
// confirmPasswordInput.addEventListener('keyup', function(event) {
//   comparePasswords();
// }, true);
//
var formAccount = document.querySelector('.js-form-account');
formAccount.addEventListener('submit', function(event) {
  event.preventDefault();
  var email = accountEmail.value;
  var password = firstPasswordInput.value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}, true);
//
// // Initialize on Submit
//
// accountCreate.onclick = function () {
//   checkRequirements();
// };
