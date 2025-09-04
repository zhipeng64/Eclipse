import { AppError } from "../utils/error.js";

// Centralized error handling for both intentional and unintentional errors
export const errorHandler = (error, req, res, next) => {
  const intentionalError = error instanceof AppError ? true : false;
  const statusCode = intentionalError ? error.statusCode : 400;
  console.error({
    errorMessage: error.message,
    errorDescription: intentionalError ? error.errorDescription : "",
    stack: error.stack,
  });

  // Message sent to the frontend must be in the format
  //     {
  //         errors: [{field: "field", msg: "msg"}, ...]
  //         <any other message>
  //     }
  let clientResponse = {
    errors: [
      {
        field: "customError",
        msg: "An unexpected error has occurred",
      },
    ],
  };
  if (intentionalError) {
    clientResponse = error.clientResponse;
  }
  return res.status(statusCode).json(clientResponse);
};
