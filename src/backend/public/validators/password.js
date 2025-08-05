import { passwordSchema } from "../schemas/password.js";

const isValidPassword = (password, detailed = False) => {
  const list = passwordSchema.validate(password, { details: detailed });
  return list;
};

// Checks if two passwords are the same
const isSamePassword = (password, confirmPassword) => {
  return password == confirmPassword;
};

export { isValidPassword, isSamePassword };
