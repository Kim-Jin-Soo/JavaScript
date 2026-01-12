function createEventEmitter() {
  const events = {};

  return {
    on(event, callback) {
      events[event] = callback;
    },

    off(event, callback) {
      events[event] = null;
    },

    emit(event, ...args) {
      events[event]?.events[event](args);
    },

    once(event, callback) {
      const wrapper = (...args) => {
        callback(...args);
        this.off(event, wrapper);
      };
      this.on(event, wrapper);
    }
  };
}


// 테스트
const emitter = createEventEmitter();

const handler = (data) => console.log('Received:', data);

emitter.on('message', handler);
emitter.emit('message', 'Hello'); // "Received: Hello"
emitter.emit('message', 'World'); // "Received: World"

emitter.off('message', handler);
emitter.emit('message', 'Silent'); // (출력 없음)

emitter.once('login', (user) => console.log('Welcome:', user));
emitter.emit('login', 'Kim'); // "Welcome: Kim"
emitter.emit('login', 'Lee'); // (출력 없음)