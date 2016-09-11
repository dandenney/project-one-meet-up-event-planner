*************************************

Events
-> Event creation and retrieval

*************************************

-------------------------------------
Create an Event
-------------------------------------

```js
function createEvent() {

```
-------------------------------------
Private Variables
-------------------------------------

```js
  var eventCreateForm = document.querySelector('#form-event');
  var eventNameInput = document.querySelector('#event-name');
  var eventHostInput = document.querySelector('#event-host');
  var eventTypeInput = document.querySelector('#event-type');
  var eventBeginInput = document.querySelector('#event-begin');
  var eventEndInput = document.querySelector('#event-end');
  var eventDescriptionInput = document.querySelector('#event-description');
  var eventCreateInput = document.querySelector('#event-create');
  var eventListRef = firebase.database().ref('events');
  var newListRef = eventListRef.push();

```
-------------------------------------
Event Listeners
-------------------------------------

```js
  eventCreateInput.addEventListener('click', function() {
    eventSubmit();
  });

  eventBeginInput.addEventListener('blur', function() {
    populateEnds()
  });

```
-------------------------------------
Populate Ends
-------------------------------------

```js
  function populateEnds() {
    var beginVal = eventBeginInput.value;
    eventEndInput.value = beginVal;
  }

```
-------------------------------------
Event Submit
-------------------------------------

```js
  function eventSubmit() {

```
-------------------------------------
Private Variables
-------------------------------------

```js
    var eventName = eventNameInput.value;
    var eventHost = eventHostInput.value;
    var eventType = eventTypeInput.value;
    var eventBegin = eventBeginInput.value;
    var eventEnd = eventEndInput.value;
    var eventDescription = eventDescriptionInput.value;

```
-------------------------------------
Validate Event Inputs
-------------------------------------

```js
    if (

      eventNameInput.validity.valid &&
      eventHostInput.validity.valid &&
      eventTypeInput.validity.valid &&
      eventBeginInput.validity.valid &&
      eventEndInput.validity.valid

    ) {

```
-------------------------------------
Set in Firebase
-------------------------------------
```js
      newListRef.set({
        'eventName': eventName,
        'eventHost': eventHost,
        'eventType': eventType,
        'eventBegin': eventBegin,
        'eventEnd': eventEnd,
        'eventDescription': eventDescription
      });

    } else {
      alert('invalid');
    }

  }

}

```
-------------------------------------
Retrieve Events
-------------------------------------

```js
function retrieveEvents() {

```
-------------------------------------
Private Variables
-------------------------------------

```js
  var eventsRef = firebase.database().ref('events').orderByKey();
  var eventsContainer = document.querySelector('#all-events');

```
-------------------------------------
Retrieve from Firebase
-------------------------------------

```js
  eventsRef.on('value', function(snap) {
    snap.forEach(function(childSnap) {

```
Retrieve
```js
      var event = childSnap.val();

```
This all should be in outputEvents();

Event container
```js
      var eventContainer = document.createElement('article');
      eventContainer.className = 'event';
```
Event Name
```js
      var eventNameContainer = document.createElement('h3');
      eventNameContainer.className = 'event-name';
      var outputName = document.createTextNode(event.eventName);
```
Event Host
```js
      var eventHostContainer = document.createElement('p');
      eventHostContainer.className = 'event-host';
      var outputHost = document.createTextNode(event.eventHost);
```
Event Type
```js
      var eventTypeContainer = document.createElement('p');
      eventTypeContainer.className = 'event-type';
      var outputType = document.createTextNode(event.eventType);
```
Event Begin
```js
      var eventBeginContainer = document.createElement('p');
      eventBeginContainer.className = 'event-begin';
      var outputBegin = document.createTextNode(event.eventBegin);
```
Event End
```js
      var eventEndContainer = document.createElement('p');
      eventEndContainer.className = 'event-end';
      var outputEnd = document.createTextNode(event.eventEnd);
```
Event Description
```js
      var eventDescriptionContainer = document.createElement('p');
      eventDescriptionContainer.className = 'event-description';
      var outputDescription = document.createTextNode(event.eventDescription);

      eventsContainer.appendChild(eventContainer);
      eventContainer.appendChild(eventNameContainer);
      eventContainer.appendChild(eventHostContainer);
      eventContainer.appendChild(eventTypeContainer);
      eventContainer.appendChild(eventBeginContainer);
      eventContainer.appendChild(eventEndContainer);
      eventContainer.appendChild(eventDescriptionContainer);
      eventNameContainer.appendChild(outputName);
      eventHostContainer.appendChild(outputHost);
      eventTypeContainer.appendChild(outputType);
      eventBeginContainer.appendChild(outputBegin);
      eventEndContainer.appendChild(outputEnd);
      eventDescriptionContainer.appendChild(outputDescription);

```
Route to events
```js
      routeEvents();

    });
  });

}

```
-------------------------------------
Output Events
-------------------------------------

function outputEvents () {

// I want this to hold output methods

}

-------------------------------------
# Route Events
-------------------------------------

```js
function routeEvents () {
  window.location = '/#events';
}

```
-------------------------------------
Initializers
-------------------------------------

```js
createEvent();
retrieveEvents();

```
------------------------
Generated _Fri Aug 19 2016 06:22:42 GMT-0400 (EDT)_ from [&#x24C8; events.js](events.js "View in source")

