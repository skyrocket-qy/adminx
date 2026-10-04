import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// --- Browser APIs missing in jsdom -------------------------------------------------
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

vi.stubGlobal('scrollTo', vi.fn());

// --- Canvas 2D context mock --------------------------------------------------------
function makeCanvasContext() {
  const methods: Record<string, unknown> = {
    measureText: () => ({ width: 10 }),
    getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    createLinearGradient: () => ({ addColorStop: vi.fn() }),
    createRadialGradient: () => ({ addColorStop: vi.fn() }),
    createPattern: () => ({}),
    isPointInPath: () => false,
  };
  return new Proxy(methods, {
    get(target, prop: string) {
      if (!(prop in target)) target[prop] = vi.fn();
      return target[prop];
    },
    set(target, prop: string, value) {
      target[prop] = value;
      return true;
    },
  });
}

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: vi.fn(() => makeCanvasContext()),
});

// --- Next.js font loader mock ------------------------------------------------------
vi.mock('next/font/google', () => {
  const font = () => ({ className: 'mock-font', style: {}, variable: '--mock-font' });
  return { Inter: font, Lusitana: font, VT323: font };
});

// --- Misc jsdom polyfills ----------------------------------------------------------
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = vi.fn();
}
