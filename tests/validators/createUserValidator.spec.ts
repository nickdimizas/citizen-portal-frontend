import { describe, expect, test } from 'vitest';

import { createUserValidator } from '../../src/validators/userValidator';

const validCreateUser = {
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
  role: 'admin',
};

describe('createUserValidator', () => {
  describe('role rules', () => {
    test('accepts admin role', () => {
      const result = createUserValidator.safeParse({
        ...validCreateUser,
        role: 'admin',
      });

      expect(result.success).toBe(true);
    });

    test('accepts employee role', () => {
      const result = createUserValidator.safeParse({
        ...validCreateUser,
        role: 'employee',
      });

      expect(result.success).toBe(true);
    });

    test('accepts citizen role', () => {
      const result = createUserValidator.safeParse({
        ...validCreateUser,
        role: 'citizen',
      });

      expect(result.success).toBe(true);
    });

    test('rejects invalid role', () => {
      const result = createUserValidator.safeParse({
        ...validCreateUser,
        role: 'manager',
      });

      expect(result.success).toBe(false);
    });
  });
});
