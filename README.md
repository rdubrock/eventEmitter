# event-emitter

event-emitter allows you to subcribe to and emit events. 

## Install

Clone this repo, and `cd` into the folder where this README is located. Run `npm link`.
Next, `cd` into the root of the project you would like to use EventEmitter in, and run `npm link event-emitter`.
Once the link is set up, you can use event-emitter just like an npm package:

```
// In the browser
import eventEmitter from 'event-emitter';
// Using Node
const eventEmitter = require('event-emitter');
```

## API
### Emitting events
#### `.emit(eventName, [...optionalPayload])`
  When emitting an event, you can pass as many arguments as you like, and they will be used to call the eventHandler.
  ```
    emitter.emit('anEventName', 'some', 'data', 'as', 'much', 'as', 'you', 'like');
  ```
### Subscriptions
#### `.on(eventName, eventHandler)`
  For subscribing to an event. Both a name and a handler function are required. Returns a function to unsubscribe.
#### `.once(eventName, eventHandler)`
  The subscription will automatically be removed after the first firing.
#### `.showEventSubscriptions()`
  Will show number of subscriptions per event
### Unsubscribing
  There are multiple ways to unsubscribe from an event. When you subcribe, the emitter returns an unsubscribe function to the `.on` call:
  
  ```
  const unsubscribe = eventEmitter.on('myEvent', () => doWork());
  unsubscribe()
  ```
  
  Additionally, when an event handler is called, an unsubscribe function is provided as the last argument to the event handler:

  ```
  const eventHandler = (arg1, arg2, arg3, unsubscribe) => {
    doWork();
    unsubscribe();
  };
  emitter.on('myEvent', eventHandler);
  emitter.emit('myEvent', 'arg1 value', 'arg2 value', 'arg3 value');
  // The handler will unsubscribe itself
  ```
  #### `.resetSubscriptionsForEvent(eventName)`
    Will clear all subscriptions for a given event
  #### `.resetAllSubscriptions()`
    Will clear all subscriptions for all events
  
  
