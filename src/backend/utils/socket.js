import { parseCookies } from "./cookie.js";
import authService from "../services/authService.js";
const getTokens = async (cookieString) => {
  // A connecting client socket must pass authentication checks
  const { jwt, refreshToken } = parseCookies(cookieString);
  const decodedJwtToken = await authService.validateTokens(
    jwt,
    refreshToken,
    null
  );
  return decodedJwtToken;
};

export { getTokens };
