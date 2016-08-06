// *************************************
//
//   Nav
//   -> Change sections via JavaScript
//
// *************************************

function changeSection() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var openCreateAccount = document.querySelector('#js-openCreateAccount');
  var createAccount = document.querySelector('#create-account');
  var openAuthAccount = document.querySelector('#js-signInOutAccount');
  var authAccount = document.querySelector('#auth-account');
  var openCreateEvent = document.querySelector('#js-openCreateEvent');
  var createEvent = document.querySelector('#create-event');
  var openEvents = document.querySelector('#js-openEvents');
  var events = document.querySelector('#events');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // Add showing class to create account
  openCreateAccount.addEventListener('click', function(event) {
    clearShowing();
    createAccount.classList.add('is-showing');
  }, false);

  // Add showing class to auth account
  openAuthAccount.addEventListener('click', function(event) {
    clearShowing();
    authAccount.classList.add('is-showing');
  }, false);

  // Add showing class to events
  openEvents.addEventListener('click', function(event) {
    clearShowing();
    events.classList.add('is-showing');
  }, false);

  // Add showing class to events
  openCreateEvent.addEventListener('click', function(event) {
    clearShowing();
    createEvent.classList.add('is-showing');
  }, false);

  // -------------------------------------
  //   Change Visible Section
  // -------------------------------------

  // Remove showing class
  function clearShowing() {
    var isActive = document.querySelector('.is-showing');
    isActive.classList.remove('is-showing');
  };

};

// -------------------------------------
//   Initialize
// -------------------------------------

changeSection();
