export default class EventEmitter {
  listeners = {}; // key-value pair

  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== fn
    );
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceWrapper = (...args) => {
      this.removeListener(eventName, onceWrapper);
      fn.apply(this, args);
    };
    this.on(eventName, onceWrapper);
    return this;
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].forEach((listener) => listener.apply(this, args));
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}
