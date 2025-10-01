import { parseCookies } from "./cookie.js";
import authService from "../services/AuthService.js";
const getTokens = async (cookieString) => {
  // A connecting client socket must pass authentication checks
  const { jwt, refreshToken } = parseCookies(cookieString);
  console.log("Socket JWT:", jwt);
  console.log("Socket Refresh Token:", refreshToken);
  const decodedJwtToken = await authService.validateTokens(
    jwt,
    refreshToken,
    null
  );
  console.log(decodedJwtToken);
  return decodedJwtToken;
};

export { getTokens };
