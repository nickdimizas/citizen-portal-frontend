import { describe, expect, test } from 'vitest';

import { usernameOrEmailValidator } from '../../src/validators/userValidator';

describe('usernameOrEmailValidator', () => {
  test('accepts a valid username', () => {
    const result = usernameOrEmailValidator.safeParse('john123');

    expect(result.success).toBe(true);
  });

  test('accepts a valid email', () => {
    const result = usernameOrEmailValidator.safeParse('john@example.com');

    expect(result.success).toBe(true);
  });

  test('rejects username shorter than 2 characters', () => {
    const result = usernameOrEmailValidator.safeParse('j');

    expect(result.success).toBe(false);
  });

  test('rejects username longer than 20 characters', () => {
    const result = usernameOrEmailValidator.safeParse('abcdefghijklmnopqrstu');

    expect(result.success).toBe(false);
  });

  test('rejects empty username or email', () => {
    const result = usernameOrEmailValidator.safeParse('');

    expect(result.success).toBe(false);
  });
});
