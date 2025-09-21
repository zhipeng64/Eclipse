// Validates password based on business logic
import { passwordSchema } from "../schemas/password.js";

class PasswordValidator {
  isValidPassword(password, detailed = false) {
    const list = passwordSchema.validate(password, { details: detailed });
    return list;
  }

  // Checks if two passwords are the same
  isSamePassword(password, confirmPassword) {
    return password == confirmPassword;
  }
}

const passwordValidator = new PasswordValidator();
export default passwordValidator;
