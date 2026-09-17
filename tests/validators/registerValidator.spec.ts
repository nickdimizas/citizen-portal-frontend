import { describe, expect, test } from 'vitest';

import { registerValidator } from '../../src/validators/userValidator';

const validRegistration = {
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
};

describe('registerValidator', () => {
  describe('valid registration', () => {
    test('accepts a valid registration', () => {
      const result = registerValidator.safeParse(validRegistration);

      expect(result.success).toBe(true);
    });
  });

  describe('username rules', () => {
    test('rejects username shorter than 2 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        username: 'j',
      });

      expect(result.success).toBe(false);
    });

    test('accepts username with exactly 2 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        username: 'jo',
      });

      expect(result.success).toBe(true);
    });

    test('accepts username with exactly 20 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        username: 'abcdefghijklmnopqrst',
      });

      expect(result.success).toBe(true);
    });

    test('rejects username longer than 20 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        username: 'abcdefghijklmnopqrstu',
      });

      expect(result.success).toBe(false);
    });
  });
});
