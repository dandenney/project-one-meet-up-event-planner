// *************************************
//
//   Events
//   -> Event creation and retrieval
//
// *************************************

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

function retrieveEvents() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var events = firebase.database().ref('events').orderByKey();

  // -------------------------------------
  //   Retrieve from Firebase
  // -------------------------------------

  events.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var event = childSnapshot.val();
      console.log(event);
    });
  });

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

// -------------------------------------
//   Initializers
// -------------------------------------

createEvent();
retrieveEvents();
