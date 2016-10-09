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

    var attendingRef = firebase.database().ref('users/' + currentUserId + '/' + 'attending/' + attendId)

    // Add name to attendees list in Firebase
    attendeesRef.set({
      'name'  : currentUserName,
      'title' : currentUserTitle
    });

    // Add event ID to user in Firebase
    attendingRef.set({
      'attending' : true
    })

    // Use Firebase's exists() to check for
    var allAttendeesRef = firebase.database().ref('events/' + attendId + '/eventAttendees/');

    // Use Firebase's event listener
    allAttendeesRef.on('value', function(buttonSnap) {

      // -------------------------------------
      //   Private Variables
      // -------------------------------------
      var isAttending = buttonSnap.child(currentUserId).exists();
      var attendingButtons = document.querySelectorAll('[data-key="' + attendId + '"]');

      // Show attend button if the person isn't attending
      if (isAttending === true) {

        attendingButtons.forEach(function(attendingButton) {

          attendingButton.classList.add('is-hidden');

        });

      }

    });

  }

}

function attendingFeedback () {

  var attendingRef = firebase.database().ref('users/' + currentUserId + '/attending/');

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // Use Firebase's event listener
  attendingRef.on('value', function(attendingButtonSnap) {

    // Use Firebase's event listener
    attendingRef.on('value', function(attendingButtonSnap) {

      var addAttendeeButtons = document.querySelectorAll('.btn-attend');

      addAttendeeButtons.forEach(function(boom) {

        var eventId = boom.getAttribute('data-key');
        var isAttending = attendingButtonSnap.child(eventId).exists();

        if (isAttending === true) {
          boom.classList.add('is-hidden');
        }

      });

    });

  });

}
