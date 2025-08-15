import PasswordValidator from "password-validator";

// Password policy
const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(12, "minLength") // Minimum length 12
  .is()
  .max(64) // Maximum length 64
  .has()
  .uppercase(1, "uppercase") // Must have uppercase letters
  .has()
  .lowercase(1, "lowercase") // Must have lowercase letters
  .has()
  .symbols(1, "symbol"); // Must have at least 1 symbol

// Hash Settings
const SALT_ROUNDS = 12;

export { passwordSchema, SALT_ROUNDS };
