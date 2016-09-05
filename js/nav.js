// *************************************
//
//   Nav
//   -> Page actions
//
// *************************************

// -------------------------------------
//   Focus on first input
// -------------------------------------

var authLink = document.querySelector('#js-signInOutAccount');

function focusFirst() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var authFocus = document.querySelector('#auth-email');
  console.log('this runs');
  authFocus.focus();

}

// -------------------------------------
//   Initializers
// -------------------------------------

focusFirst();
