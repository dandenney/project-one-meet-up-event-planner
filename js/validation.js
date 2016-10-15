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
  var accountForm = document.querySelector('#form-account');
  var hasValidation = document.querySelectorAll('.has-validation');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // Blur on inputs
  hasValidation.forEach(function(validationItem) {
    validationItem.addEventListener('input', function(event) {
      this.classList.add('is-active');
    }, true);
  });

  // Keyup on account password
  accountPassword.addEventListener('input', function(event) {
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
    var characterMessage = document.querySelector('.require-characters');
    var capitalMessage = document.querySelector('.require-capital');
    var numberMessage = document.querySelector('.require-number');

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
  //   Form Submission
  // -------------------------------------

  function accountSubmit() {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var passwordValidation = checkPassword();

    // Prevent form submission
    event.preventDefault();

    if (passwordValidation === true) {

      // Get values for Firebase
      var firebaseEmail = accountEmail.value;
      var firebasePassword = accountPassword.value;

      // Update current user
      currentUserName = accountName.value;
      currentUserTitle = accountTitle.value;

      // Check password requirements
      checkPassword();

      // Create account in Firebase
      firebaseCreate(firebaseEmail, firebasePassword);

      // Reset the form and clear feedback
      accountForm.reset();
      clearForm();

    }

  };

};

// -------------------------------------
//   Check Datetimes
// -------------------------------------

function validationDateTime() {

  // Private Variables
  var startInput = document.querySelector('#event-begin');
  var endInput = document.querySelector('#event-end');

  // Event listeners
  endInput.addEventListener('input', function() {

    compareTimes();

  });

  // Compare times
  function compareTimes() {

    var startDateTime = new Date(startInput.value);
    var endDateTime = new Date(endInput.value);

    if (endDateTime > startDateTime) {

      isAfter = true;
      endInput.classList.remove('is-invalid');
      endInput.classList.add('is-valid');
      retrieveValidation(isAfter);

    } else {

      isAfter = false;
      endInput.classList.remove('is-valid');
      endInput.classList.add('is-invalid');
      retrieveValidation(isAfter);

    }

  };

}

function retrieveValidation(isAfter) {

  return isAfter;

}



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
//   Initialize
// -------------------------------------

validation();
validationDateTime();
