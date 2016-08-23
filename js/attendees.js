// *************************************
//
//   Attendees
//   -> Adding/removing attendees from meetups
//   Attend button is created in outputEvents()
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
//   Add an Attend Button
// -------------------------------------

function addAttendButton() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------



}

// -------------------------------------
//   Initialize
// -------------------------------------

// addAttendee();
