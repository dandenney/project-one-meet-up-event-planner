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
  accountCreate.addEventListener('click', function(event) {

    event.preventDefault();
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
      console.log('test');
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
    var emailValidation = retrieveValidation(emailIsValid);

    console.clear();
    console.log(passwordValidation + ' ' + emailValidation);

    if (passwordValidation === true && emailValidation === true) {

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
//   Validate Email
// -------------------------------------

function validationEmail() {

  // Private variables
  var emailCreateInput = document.querySelector('#your-email');
  var emailRequireInput = document.querySelector('#require-email');

  // Event Listeners
  emailCreateInput.addEventListener('blur', function() {

    // Private variables
    var emailCreate = emailCreateInput.value;
    var invalid = !emailCreate.match(/[@]\w+\.+\w/g);
    var missingSymbol = !emailCreate.match(/[@]/g);
    var missingPart = !emailCreate.match(/[@]\w/g);
    var missingPeriod = !emailCreate.match(/[@]\w+\./g);
    var missingTLD = !emailCreate.match(/[@]\w+\.+\w/g);

    if (invalid) {

      emailRequireInput.classList.remove('is-hidden');
      emailCreateInput.classList.remove('is-valid');
      emailCreateInput.classList.add('is-invalid');
      var missing = [];
      var fixes = missing.join();

      if (missingSymbol) {

        missing.push(' include an @ in the email address');

      }

      if (missingPart) {

        missing.push(' enter a part following the @');

      }

      if (missingPeriod) {

        missing.push(' include a . after the @');

      }

      if (missingTLD) {

        missing.push(' include a part after . after the @');

      }

      emailRequireInput.innerHTML = 'Please:' + missing + ', (example: email@email.com)';
      emailIsValid = false;

    } else {

      missing = [];
      emailRequireInput.classList.add('is-hidden');
      emailCreateInput.classList.remove('is-invalid');
      emailCreateInput.classList.remove('is-valid');
      emailIsValid = true;

    }

    retrieveEmailValidity(emailIsValid);

  });

}

function retrieveEmailValidity(emailIsValid) {

  console.log(emailIsValid);
  return emailIsValid;

}

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
validationEmail();
validationDateTime();
