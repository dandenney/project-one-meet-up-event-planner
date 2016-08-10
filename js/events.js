// *************************************
//
//   Events
//   -> Event creation and retrieval
//
// *************************************

// -------------------------------------
//   Create an Event
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

// -------------------------------------
//   Retrieve Events
// -------------------------------------

function retrieveEvents() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var events = firebase.database().ref('events').orderByKey();
  var eventsContainer = document.querySelector('#all-events');

  // -------------------------------------
  //   Retrieve from Firebase
  // -------------------------------------

  events.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var event = childSnapshot.val();
      console.log(event.eventName + " " + event.eventType);

      eventsContainer.innerHTML +=
        event.eventName +
        event.eventType
      ;

    });
  });

}

// -------------------------------------
//   Output Events
// -------------------------------------

// function outputEvents () {
//
//   var eventContainer = document.querySelector('.js-event');
//
//   eventContainer.innerHTML = retrieveEvents();
//
// }

// -------------------------------------
//   Initializers
// -------------------------------------

createEvent();
retrieveEvents();
