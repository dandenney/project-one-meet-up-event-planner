// *************************************
//
//   Attendees
//   -> Adding/removing attendees from meetups
//
// *************************************

// -------------------------------------
//   Manually add an attendee
// -------------------------------------

function addAttendee() {
  var attendeesRef = firebase.database().ref('events/-KPtY3wfRtxtd3GJCcQy/eventAttendees');
  var addAttendeeRef = attendeesRef.push();

  addAttendeeRef.set({
    'id': 2,
    'name': 'Leroy Jenkins'
  });
}

// -------------------------------------
//   Initialize
// -------------------------------------

// addAttendee();
