class EventEmitter {
  
  constructor() {
    this.subscriptions = {};
  }

  on(eventName, eventHandler, callOnce) {
    if (!eventName || !eventHandler) {
      throw new Error('Subscription failed: An event name and event handler are required for event subscriptions');
    }
    
    if (!this.subscriptions[eventName]) {
      this.subscriptions[eventName] = [];
    }
    const unsubscribe = this.buildUnsubscribe(eventName, eventHandler);
    this.subscriptions[eventName].push({
      eventHandler,
      callOnce,
      unsubscribe, 
    });
    return unsubscribe
  };

  once(eventName, eventHandler) {
    this.on(eventName, eventHandler, true);
  } 

  emit(eventName, ...args) {
    if (!eventName) {
      throw new Error('Could not emit event. Event name is required.');
    }
    if (!this.subscriptions[eventName]) {
      return;
    }
    
    this.subscriptions[eventName].forEach((sub) => {
      sub.eventHandler(...args, sub.unsubscribe);
      if (sub.callOnce) {
        sub.unsubscribe();
      }
    });
  };

  buildUnsubscribe(eventName, eventHandler) {
    return () => {
      this.unsubscribe(eventName, eventHandler);
    }
  }

  unsubscribe(eventName, eventHandler) {
    if (!eventName || !eventHandler) {
      throw new Error('Unsubscribe requires an event name and event handler function');
    }
    let subscriptionFound = false;
    this.subscriptions[eventName] = this.subscriptions[eventName].filter((sub) => {
      if (sub.eventHandler === eventHandler) {
        subscriptionFound = true;
        return false;
      } else {
        return true;
      }
    });
    return subscriptionFound;
  }

  resetAllSubscriptions() {
    this.subscriptions = {};
  }

  resetSubscriptionsForEvent(eventName) {
    if (!eventName) {
      throw new Error('Could not reset subscriptions. Event name required.');
    }
    this.subscriptions[eventName] = [];
  }

  showEventSubscriptions() {
    const activeEvents = {};
    Object.keys(this.subscriptions).forEach((eventName) => {
      activeEvents[eventName] = this.subscriptions[eventName].length;
    });
    return activeEvents;
  }
}

module.exports = EventEmitter;
