const isJwtFormatInvalid = (decodedJwt) => {
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
};

const isRefreshTokenFormatInvalid = (refreshToken) => {
  return typeof refreshToken !== "string";
};

export { isJwtFormatInvalid, isRefreshTokenFormatInvalid };
