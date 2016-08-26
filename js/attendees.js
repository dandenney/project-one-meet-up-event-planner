// *************************************
//
//   Attendees
//   -> Adding/removing attendees from meetups
//   -> Attend button is created in outputEvents()
//
// *************************************

function addAttendee() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var addAttendeeButtons = document.querySelectorAll('.btn-attend');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // When any add attendee button is clicked
  addAttendeeButtons.forEach(function(addAttendeeButton) {
    addAttendeeButton.addEventListener('click', function(event) {

      var attendId = this.getAttribute('data-key');
      var currentUser = getCurrentUser();

      // Adds current user to attendees list in Firebase
      addCurrentUser(currentUser, attendId);

    }, true);
  });

  // -------------------------------------
  //   Get Current User
  // -------------------------------------

  function getCurrentUser() {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    // TODO: Refactor, these are duplicated from events
    var user = firebase.auth().currentUser;
    var eventAttendeeName = user.displayName;
    var eventAttendeeID = user.uid;
    return [ eventAttendeeName, eventAttendeeID ];

  }

  function addCurrentUser(currentUser, attendId) {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var attendeesRef = firebase.database().ref('events/' + attendId + '/eventAttendees');
    var addAttendeeRef = attendeesRef.push();

    // Add name to attendees list in Firebase
    addAttendeeRef.set({
      'name': currentUser[0],
      'uid': currentUser[1]
    });

  }

}

// -------------------------------------
//   Initialize
// -------------------------------------

// addAttendee();
