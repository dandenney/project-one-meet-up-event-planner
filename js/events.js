// Add a placeholder event //

var eventPlaceholder = {
  name: 'Nanodegree Alumni Bash',
  location: 'Impasse de la Fidélité 4, 1000 Bruxelles, Belgium',
  type: 'Web',
  dateTime: 'July 30, 9pm-12am',
  host: 'Dan Denney',
  description: 'This is a placeholder event description.'
}

function createPlaceholder () {

  // Add name
  var placeholderName = document.querySelector('#placeholder-name');
  placeholderName.innerHTML = eventPlaceholder.name;

  // Add location
  var placeholderLocation = document.querySelector('#placeholder-location');
  placeholderLocation.innerHTML = eventPlaceholder.location;

  // Add type
  var placeholderType = document.querySelector('#placeholder-type');
  placeholderType.innerHTML = eventPlaceholder.type;

  // Add dateTime
  var placeholderDateTime = document.querySelector('#placeholder-dateTime');
  placeholderDateTime.innerHTML = eventPlaceholder.dateTime;

  // Add host
  var placeholderHost = document.querySelector('#placeholder-host');
  placeholderHost.innerHTML = eventPlaceholder.host;

  // Add description
  var placeholderDescription = document.querySelector('#placeholder-description');
  placeholderDescription.innerHTML = eventPlaceholder.description;

}

createPlaceholder();

// -------------------------------------
//   Create Event
// -------------------------------------

function createEvent() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var eventCreateForm = document.querySelector('#js-form-event');
  var eventNameInput = document.querySelector('#event-name');
  var eventTypeInput = document.querySelector('#event-type');
  var eventCreateInput = document.querySelector('#event-create');
  var eventListRef = firebase.database().ref('events');
  var newListRef = eventListRef.push();

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  eventCreateInput.addEventListener('click', function() {
    eventSubmit();
  });

  // -------------------------------------
  //   Event Submit
  // -------------------------------------

  function eventSubmit() {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var eventName = eventNameInput.value;
    var eventType = eventTypeInput.value;

    // -------------------------------------
    //   Set in Firebase
    // -------------------------------------

    newListRef.set({
      'eventName': eventName,
      'eventType': eventType
    });

    eventCreateForm.reset();

  }

}

createEvent();

// function retrieveEvents(eventId) {
//   firebase.database().ref('events/' + eventId + '/eventName').on('value', function(snapshot) {
//     console.log(snapshot.val());
//   });
// }
//
// retrieveEvents(1);
