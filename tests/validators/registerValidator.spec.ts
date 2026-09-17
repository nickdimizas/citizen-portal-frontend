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

  describe('email rules', () => {
    test('rejects empty email', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        email: '',
      });

      expect(result.success).toBe(false);
    });

    test('rejects email without @', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        email: 'john.example.com',
      });

      expect(result.success).toBe(false);
    });

    test('rejects email without domain', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        email: 'john@',
      });

      expect(result.success).toBe(false);
    });

    test('rejects email with invalid top-level domain', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        email: 'john@example.c',
      });

      expect(result.success).toBe(false);
    });

    test('accepts a valid email', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        email: 'john.doe@example.com',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('password rules', () => {
    test('rejects password shorter than 8 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        password: 'Pass1!',
      });

      expect(result.success).toBe(false);
    });

    test('rejects password without a letter', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        password: '12345678!',
      });

      expect(result.success).toBe(false);
    });

    test('rejects password without a number', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        password: 'Password!',
      });

      expect(result.success).toBe(false);
    });

    test('rejects password without a special character', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        password: 'Password1',
      });

      expect(result.success).toBe(false);
    });

    test('accepts a valid password', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        password: 'Password1!',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('firstname rules', () => {
    test('rejects firstname shorter than 2 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        firstname: 'J',
      });

      expect(result.success).toBe(false);
    });

    test('accepts firstname with exactly 2 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        firstname: 'Jo',
      });

      expect(result.success).toBe(true);
    });

    test('accepts firstname with exactly 50 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        firstname: 'A'.repeat(50),
      });

      expect(result.success).toBe(true);
    });

    test('rejects firstname longer than 50 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        firstname: 'A'.repeat(51),
      });

      expect(result.success).toBe(false);
    });
  });

  describe('lastname rules', () => {
    test('rejects lastname shorter than 2 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        lastname: 'D',
      });

      expect(result.success).toBe(false);
    });

    test('accepts lastname with exactly 2 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        lastname: 'Do',
      });

      expect(result.success).toBe(true);
    });

    test('accepts lastname with exactly 50 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        lastname: 'A'.repeat(50),
      });

      expect(result.success).toBe(true);
    });

    test('rejects lastname longer than 50 characters', () => {
      const result = registerValidator.safeParse({
        ...validRegistration,
        lastname: 'A'.repeat(51),
      });

      expect(result.success).toBe(false);
    });
  });
});
