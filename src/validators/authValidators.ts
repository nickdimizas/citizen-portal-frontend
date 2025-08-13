import { z } from 'zod';

const usernameOrEmailValidator = z
  .string()
  .transform((str) => str.trim())
  .refine(
    (val) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
      const usernameMinLength = 2;
      const usernameMaxLength = 20;

      return (
        emailRegex.test(val) || (val.length >= usernameMinLength && val.length <= usernameMaxLength)
      );
    },
    {
      message:
        'Must be a valid email (e.g. name@example.com) or a username between 2 and 20 characters',
    },
  );

const loginValidator = z.object({
  usernameOrEmail: usernameOrEmailValidator,
  password: z
    .string()
    .transform((str) => str.trim())
    .refine((val) => val.length >= 8, {
      message: 'Password must be at least 8 characters',
    })
    .refine((val) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(val), {
      message:
        'Password must contain at least one letter, one number, and one special character (!@#$%^&*)',
    }),
});

export type LoginFormInputs = z.infer<typeof loginValidator>;
export { loginValidator };
