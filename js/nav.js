// *************************************
//
//   Nav
//   -> Page actions
//
// *************************************

// -------------------------------------
//   Focus on first input
// -------------------------------------

function focusFirst() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var createEventTrigger = document.querySelector('#nav-createAccount');
  var authAccountTrigger = document.querySelector('#nav-auth');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  createEventTrigger.addEventListener('click', function() {
    window.setTimeout(function () {
      document.querySelector('#event-name').focus();
    }, 0);
  });

  authAccountTrigger.addEventListener('click', function() {
    window.setTimeout(function () {
      document.querySelector('#auth-email').focus();
    }, 0);
  });

}

// -------------------------------------
//   Initializers
// -------------------------------------

focusFirst();
