import { describe, expect, test } from 'vitest';

import { registerValidator } from '../../src/validators/userValidator';

describe('registerValidator', () => {
  describe('valid registration', () => {
    test('accepts a valid registration', () => {
      const result = registerValidator.safeParse({
        username: 'john123',
        email: 'john@example.com',
        password: 'Password1!',
        firstname: 'John',
        lastname: 'Doe',
        phoneNumber: '6912345678',
        address: {
          city: 'Athens',
          street: 'Patision',
          number: '10',
          postcode: '10431',
        },
        ssn: '123456789',
      });

      expect(result.success).toBe(true);
    });
  });
});
