import { expect, afterEach, beforeAll, afterAll, beforeEach, vi, type MockInstance } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import ResizeObserver from 'resize-observer-polyfill';

import { server } from './src/mocks/server';

let mathSpy: MockInstance;

expect.extend(matchers);

beforeAll(() => server.listen());

beforeEach((): void => {
  mathSpy = vi.spyOn(Math, 'random').mockReturnValue(0.1);
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  mathSpy.mockRestore();
  vi.clearAllMocks();
});

afterAll(() => server.close());

const documentHeadHTML = `<title>Unit Tests</title>`;
const documentBodyHTML = ``;

global.window.document.head.innerHTML = documentHeadHTML;
global.window.document.body.innerHTML = documentBodyHTML;

global.window.innerWidth = 1920;
global.window.innerHeight = 1080;

if (typeof global.window.ResizeObserver === 'undefined') {
  global.window.ResizeObserver = ResizeObserver;
}
