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
  var eventHostInput = document.querySelector('#event-host');
  var eventTypeInput = document.querySelector('#event-type');
  var eventBeginInput = document.querySelector('#event-begin');
  var eventEndInput = document.querySelector('#event-end');
  var eventLocationNameInput = document.querySelector('#event-locationName');
  var eventStreetInput = document.querySelector('#event-street');
  var eventCityInput = document.querySelector('#event-city');
  var eventStateInput = document.querySelector('#event-state');
  var eventZipInput = document.querySelector('#event-zip');
  var eventDescriptionInput = document.querySelector('#event-description');
  var eventCreateInput = document.querySelector('#event-create');
  var eventListRef = firebase.database().ref('events');
  var newListRef = eventListRef.push();

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  eventCreateInput.addEventListener('click', function() {
    eventSubmit();
  });

  eventBeginInput.addEventListener('blur', function() {
    populateEnds()
  });

  // -------------------------------------
  //   Populate Ends
  // -------------------------------------

  function populateEnds() {
    var beginVal = eventBeginInput.value;
    eventEndInput.value = beginVal;
  }

  // -------------------------------------
  //   Event Submit
  // -------------------------------------

  function eventSubmit() {

    // -------------------------------------
    //   Private Variables
    // -------------------------------------

    var eventName = eventNameInput.value;
    var eventHost = eventHostInput.value;
    var eventType = eventTypeInput.value;
    var eventBegin = eventBeginInput.value;
    var eventEnd = eventEndInput.value;
    var eventLocationName = eventLocationNameInput.value;
    var eventStreet = eventStreetInput.value;
    var eventCity = eventCityInput.value;
    var eventState = eventStateInput.value;
    var eventZip = eventZipInput.value;
    var eventDescription = eventDescriptionInput.value;
    var user = firebase.auth().currentUser;
    var eventInitialAttendeeName = user.displayName;
    var eventInitialAttendeeId = user.uid;

    // -------------------------------------
    //   Validate Event Inputs
    // -------------------------------------

    if (

      eventNameInput.validity.valid &&
      eventHostInput.validity.valid &&
      eventTypeInput.validity.valid &&
      eventBeginInput.validity.valid &&
      eventEndInput.validity.valid &&
      eventStreetInput.validity.valid &&
      eventCityInput.validity.valid &&
      eventStateInput.validity.valid &&
      eventZipInput.validity.valid

    ) {

      // -------------------------------------
      //   Set in Firebase
      // -------------------------------------
      newListRef.set({
        'eventName': eventName,
        'eventHost': eventHost,
        'eventType': eventType,
        'eventBegin': eventBegin,
        'eventEnd': eventEnd,
        'eventLocationName': eventLocationName,
        'eventStreet': eventStreet,
        'eventCity': eventCity,
        'eventState': eventState,
        'eventZip': eventZip,
        'eventDescription': eventDescription,
        'eventAttendees': { 'eventAttendee' : { 'id' : eventInitialAttendeeId, 'name' : eventInitialAttendeeName } }
      });

    } else {
      alert('invalid');
    }

  }

}

// -------------------------------------
//   Retrieve Events
// -------------------------------------

function retrieveEvents() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var eventsRef = firebase.database().ref('events').orderByKey();

  // -------------------------------------
  //   Retrieve from Firebase
  // -------------------------------------

  eventsRef.on('value', function(snap) {
    snap.forEach(function(childSnap) {

      // Output events
      outputEvents(childSnap);

      // Add attend buttons
      addAttendee();

      // Route to events
      routeEvents();

    });
  });

}

// -------------------------------------
//   Output Events
// -------------------------------------

function outputEvents(childSnap) {

  // Define events from Firebase
  var event = childSnap.val();

  // Format Datetimes
  var momentBegin = moment(event.eventBegin).format('lll');

  // Create date objects from datetime values
  var eventBeginDay = new Date(event.eventBegin);
  var eventEndDay = new Date(event.eventEnd);

  // Output hours if same day, whole date if not
  if ( eventBeginDay.getDay() === eventEndDay.getDay() ) {
    var momentEnd =  moment(event.eventEnd).format('LT');
  } else {
    var momentEnd = moment(event.eventEnd).format('lll');
  }

  // Events container
  var eventsContainer = document.querySelector('#all-events');
  // Event container
  var eventContainer = document.createElement('article');
  eventContainer.className = 'card event';
  // Event Name
  var eventNameContainer = document.createElement('h3');
  eventNameContainer.className = 'event-name';
  var outputName = document.createTextNode(event.eventName);
  // Event Host
  var eventHostContainer = document.createElement('p');
  eventHostContainer.className = 'event-host';
  var outputHost = document.createTextNode(event.eventHost);
  // Event Type
  var eventTypeContainer = document.createElement('p');
  eventTypeContainer.className = 'event-type';
  var outputType = document.createTextNode(event.eventType);
  // Event Range
  var eventRangeContainer = document.createElement('p');
  eventRangeContainer.className = 'event-range';
  // Event Location
  var eventLocationContainer = document.createElement('p');
  eventLocationContainer.className = 'event-location';
  var outputType = document.createTextNode(event.eventLocationName + ', ' + event.eventStreet + ', ' + event.eventCity + ', ' + event.eventState + ' ' + event.eventZip);
  // Event Description
  var eventDescriptionContainer = document.createElement('p');
  eventDescriptionContainer.className = 'event-description';
  var outputDescription = document.createTextNode(event.eventDescription);
  // Event Attendees
  var eventAttendeesContainer = document.createElement('ul');
  eventAttendeesContainer.className = 'event-attendees';
  var eventAttendeeContainer = document.createElement('li');
  eventAttendeeContainer.className = 'event-attendee';
  var outputAttendee = document.createTextNode(event.eventAttendees.eventAttendee.name);
  // Attend Button
  var attendButton = document.createElement('button');
  attendButton.className = 'btn btn-attend';
  attendButton.innerHTML = 'Attend';
  attendButton.dataset.key = childSnap.key;

  // Create all DOM elements for events
  eventsContainer.appendChild(eventContainer);
  eventContainer.appendChild(eventNameContainer);
  eventContainer.appendChild(eventHostContainer);
  eventContainer.appendChild(eventTypeContainer);
  eventContainer.appendChild(eventRangeContainer);
  eventContainer.appendChild(eventLocationContainer);
  eventContainer.appendChild(eventDescriptionContainer);
  eventContainer.appendChild(eventAttendeesContainer);
  eventAttendeesContainer.appendChild(eventAttendeeContainer);
  eventContainer.appendChild(attendButton);

  // Output event values as text nodes
  eventNameContainer.appendChild(outputName);
  eventHostContainer.appendChild(outputHost);
  eventTypeContainer.appendChild(outputType);
  eventRangeContainer.innerHTML = momentBegin + ' to ' + momentEnd;
  eventLocationContainer.appendChild(outputType);
  eventDescriptionContainer.appendChild(outputDescription);
  eventAttendeeContainer.appendChild(outputAttendee);

}

// -------------------------------------
//   # Route Events
// -------------------------------------

function routeEvents () {
  window.location = '/#events';
}

// -------------------------------------
//   Initializers
// -------------------------------------

createEvent();
retrieveEvents();
