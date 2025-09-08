import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

// Proper middleware
const validateResult = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    console.log(results);
    const clientResponse = {
      errors: results.array().map(({ path, msg }) => ({
        field: path,
        msg: msg,
      })),
    };
    throw new AppError({
      originalErrorMessage: error.message,
      originalErrorStackTrace: error.stack,
      httpStatus: 400,
      clientResponse,
    });
  }
  next();
};

export { validateResult };
