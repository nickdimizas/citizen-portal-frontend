import { z } from 'zod';

type RegisterFormInputs = z.infer<typeof registerValidator>;
type LoginFormInputs = z.infer<typeof loginValidator>;
type UpdateUserFormInputs = z.infer<typeof updateUserValidator>;
type ChangePasswordFormInputs = z.infer<typeof changePasswordValidator>;
type CreateUserFormInputs = z.infer<typeof createUserValidator>;

const registerValidator = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 2, { message: 'Username must be at least 2 characters' })
      .refine((val) => val.length <= 20, { message: 'Username must be at most 20 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .transform((str) => str.trim())
      .refine(
        (val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/.test(val),
        { message: 'Please enter a valid email address in the format name@example.com' },
      ),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 8, { message: 'Password must be at least 8 characters' })
      .refine((val) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(val), {
        message:
          'Password must contain at least one letter, one number, and one special character (!@#$%^&*)',
      }),
    firstname: z
      .string()
      .min(1, { message: 'First Name is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 2, { message: 'Firstname must be at least 2 characters' })
      .refine((val) => val.length <= 50, { message: 'Firstname must be at most 50 characters' }),
    lastname: z
      .string()
      .min(1, { message: 'Last Name is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 2, { message: 'Lastname must be at least 2 characters' })
      .refine((val) => val.length <= 50, { message: 'Lastname must be at most 50 characters' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .transform((str) => str.trim())
      .refine((val) => /^\d{10}$/.test(val), { message: 'Phone number must be exactly 10 digits' }),
    address: z.object({
      city: z
        .string()
        .min(1, { message: 'City is required' })
        .transform((str) => str.trim())
        .refine((val) => val.length >= 2, { message: 'City must be at least 2 characters' })
        .refine((val) => val.length <= 50, { message: 'City must be at most 50 characters' }),
      street: z
        .string()
        .min(1, { message: 'Street is required' })
        .transform((str) => str.trim())
        .refine((val) => val.length <= 50, { message: 'Street must be at most 50 characters' }),
      number: z
        .string()
        .min(1, { message: 'Street number is required' })
        .refine((val) => val.length <= 10, {
          message: 'Street number must be at most 10 characters',
        }),
      postcode: z
        .string()
        .min(1, { message: 'Postcode is required' })
        .transform((str) => str.trim())
        .refine((val) => /^\d{5}$/.test(val), { message: 'Postcode must be exactly 5 digits' }),
    }),

    ssn: z
      .string()
      .min(1, { message: 'Ssn is required' })
      .transform((str) => str.trim())
      .refine((val) => /^\d{9}$/.test(val), { message: 'SSN must be exactly 9 digits' }),
  })
  .strict();

const createUserValidator = registerValidator
  .extend({
    role: z.enum(['admin', 'employee', 'citizen']),
  })
  .strict();

const usernameOrEmailValidator = z
  .string()
  .min(1, { message: 'Username is required' })
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
        'Must be a valid email(e.g. name@example.com) or a username between 2 and 20 characters',
    },
  );

const loginValidator = z
  .object({
    usernameOrEmail: usernameOrEmailValidator,
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 8, { message: 'Password must be at least 8 characters' })
      .refine((val) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(val), {
        message:
          'Password must contain at least one letter, one number, and one special character (!@#$%^&*)',
      }),
  })
  .strict();

const updateUserValidator = z
  .object({
    username: z
      .string()
      .transform((str) => str.trim())
      .refine((val) => val.length >= 2, { message: 'Username must be at least 2 characters' })
      .refine((val) => val.length <= 20, { message: 'Username must be at most 20 characters' })
      .optional(),
    email: z
      .string()
      .transform((str) => str.trim())
      .refine(
        (val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/.test(val),
        { message: 'Please enter a valid email address in the format name@example.com' },
      )
      .optional(),
    firstname: z
      .string()
      .transform((str) => str.trim())
      .refine((val) => val.length >= 2, { message: 'Firstname must be at least 2 characters' })
      .refine((val) => val.length <= 50, { message: 'Firstname must be at most 50 characters' })
      .optional(),
    lastname: z
      .string()
      .transform((str) => str.trim())
      .refine((val) => val.length >= 2, { message: 'Lastname must be at least 2 characters' })
      .refine((val) => val.length <= 50, { message: 'Lastname must be at most 50 characters' })
      .optional(),
    phoneNumber: z
      .string()
      .transform((str) => str.trim())
      .refine((val) => /^\d{10}$/.test(val), { message: 'Phone number must be exactly 10 digits' })
      .optional(),
    address: z
      .object({
        city: z
          .string()
          .transform((str) => str.trim())
          .refine((val) => val.length >= 2, { message: 'City must be at least 2 characters' })
          .refine((val) => val.length <= 50, { message: 'City must be at most 50 characters' })
          .optional(),
        street: z
          .string()
          .transform((str) => str.trim())
          .refine((val) => val.length <= 50, { message: 'Street must be at most 50 characters' })
          .optional(),
        number: z
          .string()
          .refine((val) => val.length <= 10, {
            message: 'Street number must be at most 10 characters',
          })
          .optional(),
        postcode: z
          .string()
          .transform((str) => str.trim())
          .refine((val) => /^\d{5}$/.test(val), { message: 'Postcode must be exactly 5 digits' })
          .optional(),
      })
      .optional(),
    ssn: z
      .string()
      .transform((str) => str.trim())
      .refine((val) => /^\d{9}$/.test(val), { message: 'SSN must be exactly 9 digits' })
      .optional(),
  })
  .strict();

const changePasswordValidator = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: 'New Password is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 8, { message: 'Password must be at least 8 characters' })
      .refine((val) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(val), {
        message:
          'Password must contain at least one letter, one number, and one special character (!@#$%^&*)',
      }),
    currentPassword: z
      .string()
      .min(1, { message: 'Current Password is required' })
      .transform((str) => str.trim())
      .refine((val) => val.length >= 8, {
        message: 'Current password must be at least 8 characters',
      }),
  })
  .strict();

export type {
  RegisterFormInputs,
  LoginFormInputs,
  ChangePasswordFormInputs,
  UpdateUserFormInputs,
  CreateUserFormInputs,
};
export {
  loginValidator,
  registerValidator,
  changePasswordValidator,
  updateUserValidator,
  createUserValidator,
};
