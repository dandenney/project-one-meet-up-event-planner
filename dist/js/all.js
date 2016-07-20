// Global Variables //
var firstPasswordInput = document.querySelector('#your-password');
var accountCreate = document.querySelector('#account-create');

// Check Requirements //
function checkRequirements() {

  // Check Password Length
  var firstPasswordLength = firstPasswordInput.value;
  if (firstPasswordLength.length < 8) {
    firstPasswordInput.className += ' is-invalid';
  } else {
    firstPasswordInput.className += ' is-valid';
  }

};

// Initialize on Submit

accountCreate.onclick = function () {
  checkRequirements();
};
