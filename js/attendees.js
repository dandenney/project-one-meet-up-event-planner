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

    // Use Firebase's exists() to check for
    var allAttendeesRef = firebase.database().ref('events/' + attendId + '/eventAttendees/');

    // Use Firebase's event listener
    allAttendeesRef.on('value', function(buttonSnap) {

      // -------------------------------------
      //   Private Variables
      // -------------------------------------
      var isAttending = buttonSnap.child(currentUserId).exists();
      var attendingButtons = document.querySelectorAll('[data-key="' + attendId + '"]');

      console.log(attendingButtons);

      // Show attend button if the person isn't attending
      if (isAttending === true) {

        attendingButtons.forEach(function(attendingButton) {

          attendingButton.classList.add('is-hidden');

        });

      }

    });

  }

}
