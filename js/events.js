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

  var eventCreateForm = document.querySelector('#form-event');
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

  // Events container
  var eventsContainer = document.querySelector('#all-events');

  // -------------------------------------
  //   Event Listeners
  // -------------------------------------

  eventCreateInput.addEventListener('click', function(event) {

    // Don't submit the form
    event.preventDefault();

    // Send data to Firebase
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
        'eventDescription': eventDescription
      });

      routeEvents();

    } else {
      alert('invalid');
    }

    eventCreateForm.reset();
    clearForm();

  }

}

function retrieveEventsNew() {

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  var eventsRef = firebase.database().ref('events').orderByKey();
  var eventsContainer = document.querySelector('#all-events');

  eventsRef.on('child_added', function(snap) {

    var event = snap.val();

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

    // Create, append and add classes to an article for each event
    var eventContainer = document.createElement('article');
    eventsContainer.appendChild(eventContainer);
    eventContainer.className = 'card event';

    // Create, append and add classes to an h3 for each event name
    var eventNameContainer = document.createElement('h3');
    eventContainer.appendChild(eventNameContainer);
    eventNameContainer.className = 'event-name';
    eventNameContainer.innerHTML = event.eventName;

    // Check for an event description
    if (event.eventDescription != '') {
      // Create, append and add classes to an p for each event name
      var eventDescriptionContainer = document.createElement('p');
      eventContainer.appendChild(eventDescriptionContainer);
      eventDescriptionContainer.className = 'event-description';
      eventDescriptionContainer.innerHTML = event.eventDescription;
    }

    // Create, append and add classes to a p for each event range
    var eventRangeContainer = document.createElement('p');
    eventContainer.appendChild(eventRangeContainer);
    eventRangeContainer.className = 'event-range';
    eventRangeContainer.innerHTML = momentBegin + ' to ' + momentEnd;

    // Create, append and add classes to a p for each event range
    var eventTypeContainer = document.createElement('p');
    eventContainer.appendChild(eventTypeContainer);
    eventTypeContainer.className = 'event-type';
    eventTypeContainer.innerHTML = event.eventType;

    // Create, append and add classes to a p for each event location
    var eventLocationContainer = document.createElement('p');
    eventContainer.appendChild(eventLocationContainer);
    eventLocationContainer.className = 'event-location';

    // Check for an event location name
    if (event.eventLocationName != '') {
      eventLocationContainer.innerHTML = event.eventLocationName + '<br />' + event.eventStreet + '<br />' + event.eventCity + ', ' + event.eventState + ' ' + event.eventZip;
    } else {
      eventLocationContainer.innerHTML = event.eventStreet + '<br />' + event.eventCity + ', ' + event.eventState + ' ' + event.eventZip;
    }

    // Use Firebase's exists() to check for
    var allAttendeesRef = firebase.database().ref('events/' + snap.key + '/eventAttendees/');

    // Attend Button
    var attendButton = document.createElement('button');
    eventContainer.appendChild(attendButton);
    attendButton.className = 'btn btn-attend';
    attendButton.innerHTML = 'Attend';
    attendButton.dataset.key = snap.key;


    // Create, append and add classes to a p for each attendee
    var eventAllAttendeesContainer = document.createElement('ul');
    eventContainer.appendChild(eventAllAttendeesContainer);
    eventAllAttendeesContainer.className = 'event-attendees';

    allAttendeesRef.on('child_added', function(attendeeAllSnap) {
      var attendee = attendeeAllSnap.val();
      eventAllAttendeesContainer.innerHTML += "<li class='event-attendee'>" + attendee.name + "</li>";
    });

  });

}

function routeEvents () {
  window.location = '/#events';
}

// -------------------------------------
//   Initializers
// -------------------------------------

createEvent();
retrieveEventsNew();
