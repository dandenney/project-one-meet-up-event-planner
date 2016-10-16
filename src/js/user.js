// *************************************
//
//  Authentication in Firebase
//  -> Form handling and data get/send
//
// *************************************

// Store current user attributes globally

var currentUserId     = '';
var currentUserName   = '';
var currentUserTitle  = '';
var isNewUser         = false;

// -------------------------------------
//  Firebase Authorization
// -------------------------------------

function createUser() {

  // Create an entry with the user's uid
  userRef = firebase.database().ref('users/' + currentUserId);

  // Add the user's name and title
  userRef.set({
    'userName': currentUserName,
    'userTitle': currentUserTitle
  });

}

function lookupUser() {

  // Create an entry with the user's uid
  var userRef = firebase.database().ref('users/' + currentUserId);

  userRef.on('value', function(snap) {

    currentUserName = snap.val().userName;
    currentUserTitle = snap.val().userTitle;

  });

}
