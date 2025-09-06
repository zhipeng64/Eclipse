// Validate authentication tokens based on business logic
class AuthValidator {
  isJwtFormatInvalid(decodedJwt) {
    // Rigorous validation: check for expected fields and types
    return (
      typeof decodedJwt !== "object" ||
      !decodedJwt.id ||
      typeof decodedJwt.id !== "string" ||
      !decodedJwt.expiresIn ||
      typeof decodedJwt.expiresIn !== "string" ||
      !decodedJwt.iat ||
      typeof decodedJwt.iat !== "number"
    );
  }

  isRefreshTokenFormatInvalid(refreshToken) {
    return typeof refreshToken !== "string";
  }
}

const authValidator = new AuthValidator();
export default authValidator;
