import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

import { server } from './src/mocks/server';

// Extends Vitest's expect with methods from react-testing-library
expect.extend(matchers);

// Start the MSW server before all tests run.
// This sets up the request interception for your entire test suite.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in your tests (e.g., via `server.use()`).
// This ensures that your tests are isolated and don't affect each other's mocking behavior.
afterEach(() => {
  cleanup(); // Cleanup React Testing Library DOM
  server.resetHandlers(); // Reset MSW handlers
});

// Close the MSW server after all tests are done.
// This cleans up the interception logic and ensures no resources are leaked.
afterAll(() => server.close());
