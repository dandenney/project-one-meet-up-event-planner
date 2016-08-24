// *************************************
//
//   Attendees
//   -> Adding/removing attendees from meetups
//   Attend button is created in outputEvents()
//
// *************************************

function addAttendee() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------
  // var attendeesRef = firebase.database().ref('events/-KPtY3wfRtxtd3GJCcQy/eventAttendees');
  // var addAttendeeRef = attendeesRef.push();
  var addAttendeeButtons = document.querySelectorAll('.btn-attend');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  // When any add attendee button is clicked
  addAttendeeButtons.forEach(function(addAttendeeButton) {
    addAttendeeButton.addEventListener('click', function(event) {

      var attendId = this.getAttribute('data-key');

      console.clear();
      console.log('I want to attend event:' + ' ' + attendId);
    }, true);
  });

  // addAttendeeRef.set({
  //   'id': 2,
  //   'name': 'Leroy Jenkins'
  // });


}

// -------------------------------------
//   Initialize
// -------------------------------------

// addAttendee();
