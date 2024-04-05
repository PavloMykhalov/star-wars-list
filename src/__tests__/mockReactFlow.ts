// To make sure that the tests are working, it's important that you are using
// this implementation of ResizeObserver and DOMMatrixReadOnly

// Mock implementation of DOMMatrixReadOnly
class DOMMatrixReadOnly {
  m22: number;
  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }

  static fromFloat32Array(array32: Float32Array): DOMMatrixReadOnly {
    return new DOMMatrixReadOnly('');
  }

  static fromFloat64Array(array64: Float64Array): DOMMatrixReadOnly {
    return new DOMMatrixReadOnly('');
  }

  static fromMatrix(other?: DOMMatrixInit | undefined): DOMMatrixReadOnly {
    return new DOMMatrixReadOnly('');
  }
}

// Mock implementation of ResizeObserver
class ResizeObserver {
  callback: globalThis.ResizeObserverCallback;
 
  constructor(callback: globalThis.ResizeObserverCallback) {
    this.callback = callback;
  }
 
  observe(target: Element) {
    this.callback([{ target } as globalThis.ResizeObserverEntry], this);
  }
 
  unobserve() {}
 
  disconnect() {}
}

// Only run the shim once when requested
let init = false;
 
export const mockReactFlow = () => {
  if (init) return;
  init = true;
 
  global.ResizeObserver = ResizeObserver;
 
  // @ts-ignore
  global.DOMMatrixReadOnly = DOMMatrixReadOnly;
 
  Object.defineProperties(global.HTMLElement.prototype, {
    offsetHeight: {
      get() {
        return parseFloat(this.style.height) || 1;
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(this.style.width) || 1;
      },
    },
  });
 
  (global.SVGElement as any).prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
};
