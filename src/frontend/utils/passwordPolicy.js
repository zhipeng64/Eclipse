import PasswordValidator from "password-validator";

const schema = new PasswordValidator();
schema
  .is()
  .min(12, "minLength") // Minimum length 12
  .is()
  .max(64) // Maximum length 64
  .has()
  .uppercase(1, "uppercase") // Must have uppercase letters
  .has()
  .lowercase(1, "lowercase") // Must have lowercase letters
  .has()
  .digits(1, "digit") // Must have at least 1 digits
  .has()
  .symbols(1, "symbol") // Must have at least 1 symbol
  .has()
  .not()
  .spaces(); // Should not have spaces

const checkValidPassword = (password) => {
  const list = schema.validate(password, { details: true });
  return list;
};

export { checkValidPassword };
