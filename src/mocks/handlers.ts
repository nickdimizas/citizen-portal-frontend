import { http, HttpResponse } from 'msw';

// This is a simple placeholder handler.
// It intercepts a GET request to a dummy URL and returns an empty JSON object.
// You can remove or replace this handler once you start defining your actual API mocks.
export const handlers = [
  http.get('http://localhost:9999/placeholder', () => {
    // This mock will never actually be hit by your application unless you
    // specifically make a request to http://localhost:9999/placeholder
    // It's just here to make the `handlers` array non-empty for the linter.
    return HttpResponse.json({});
  }),
];
