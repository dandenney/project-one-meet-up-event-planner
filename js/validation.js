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
  var accountTitle = document.querySelector('#your-title');
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
    var firebaseTitle = accountTitle.value;
    var firebaseEmail = accountEmail.value;
    var firebasePassword = accountPassword.value;

    // Check password requirements
    checkPassword();

    // Create account in Firebase
    firebaseCreate(firebaseName, firebaseTitle, firebaseEmail, firebasePassword);

    // Reset the form and clear feedback
    accountForm.reset();
    clearForm();
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

validation();
