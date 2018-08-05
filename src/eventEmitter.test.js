const EventEmitter = require('./eventEmitter.js');

describe('EventEmitter.js', () => {
  let emitter;
  const eventHandler = jest.fn();
  const secondEventHandler = jest.fn();
  const unsubscribeMock = jest.fn();
  const buildUnsubscribeMock = jest.fn().mockImplementation(() => unsubscribeMock);
  beforeEach(() => {
    emitter = new EventEmitter();
    eventHandler.mockReset();
  })

  test('emitter should error with bad arguments', () => {
    expect(emitter.on).toThrow();
    expect(emitter.emit).toThrow();
    expect(emitter.unsubscribe).toThrow();
    expect(emitter.resetSubscriptionsForEvent).toThrow();
  });

  test('emitter.on should add subscriptions and return unsubscribe', () => {
    const unsubscribe = emitter.on('testEvent', () => {});
    expect(emitter.subscriptions['testEvent'].length).toBe(1);
    unsubscribe();
    expect(emitter.subscriptions['testEvent'].length).toBe(0);
  });

  test('emitter.emit should fire event handlers', () => {
    emitter.buildUnsubscribe = buildUnsubscribeMock;
    emitter.unsubscribe = unsubscribeMock;
    emitter.on('myEvent', eventHandler);
    emitter.on('myEvent', secondEventHandler);
    emitter.emit('myEvent', 'some', 'arguments', 'could', 'be', 'lots');
    expect(eventHandler).toHaveBeenCalledWith('some', 'arguments', 'could', 'be', 'lots', unsubscribeMock);
    expect(secondEventHandler).toHaveBeenCalledWith('some', 'arguments', 'could', 'be', 'lots', unsubscribeMock);
  });

  test('emitter.once should only fire a subscription once', () => {
    emitter.once('singleUse', eventHandler);
    emitter.emit('singleUse', 'withData');
    emitter.emit('singleUse', 'secondTime');
    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
