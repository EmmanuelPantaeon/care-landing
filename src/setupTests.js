// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom does not implement these browser APIs, which framer-motion uses for
// viewport reveal animations.
class ObserverMock {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = ObserverMock;
  global.IntersectionObserver = ObserverMock;
}

if (!window.ResizeObserver) {
  window.ResizeObserver = ObserverMock;
  global.ResizeObserver = ObserverMock;
}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  });
}
