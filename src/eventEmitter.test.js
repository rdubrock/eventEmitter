const EventEmitter = require('./eventEmitter.js');

describe('EventEmitter.js', () => {
  test('emmitter.on should return the unsubscribe function', () => {
    const emitter = new EventEmitter();
    const unsubscribeMock = jest.fn();
    emitter.unsubscribe = unsubscribeMock;
    const unsubscribe = emitter.on('eventName', () => {});
    expect(unsubscribe).toBe(unsubscribeMock);
  });
});
