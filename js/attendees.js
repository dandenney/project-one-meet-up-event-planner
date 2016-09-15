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

      // -------------------------------------
      //   Private Variables
      // -------------------------------------

      var attendId = this.getAttribute('data-key');

      // Adds current user to attendees list in Firebase
      addCurrentUser(attendId);

    }, true);
  });

  function addCurrentUser(attendId) {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var attendeesRef = firebase.database().ref('events/' + attendId + '/eventAttendees/' + currentUserId);

    console.log(attendeesRef);

    // Add name to attendees list in Firebase
    attendeesRef.set({
      'name'  : currentUserName,
      'title' : currentUserTitle
    });

  }

}
