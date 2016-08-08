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

function saveEvent(name) {
  var eventListRef = firebase.database().ref('events');
  var newListRef = eventListRef.push();
  newListRef.set({
    'eventName': 'This is the real way'
  });
}

saveEvent('Nanodegee Alumni Bash');

function retrieveEvents(eventId) {
  firebase.database().ref('events/' + eventId + '/eventName').on('value', function(snapshot) {
    console.log(snapshot.val());
  });
}

retrieveEvents(1);
