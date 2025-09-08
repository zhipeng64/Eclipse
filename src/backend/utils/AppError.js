// AppError is a custom error handling class for intentional errors that tells
// the frontend specific actions to take

// The default Error is also used for errors, intentional or unintentional, that
// sends a default message that tells the client that an unexpected error has occurred.
// This choice prevents leaking any sensitive information to the client side but still to
// let them know that there is an error.
export class AppError extends Error {
  constructor({
    originalErrorMessage,
    originalErrorStackTrace,
    errorDescription,
    statusCode = 400,
    clientResponse = {
      errors: [{ field: "customError", msg: "An unexpected error occurred" }],
    },
  }) {
    // Binds 'this' to the current AppError object and then initialize the current AppError
    // object with properties and methods in the Error object's constructor.
    super(originalErrorMessage);
    this.errorDescription = errorDescription;
    this.statusCode = statusCode;
    this.clientResponse = clientResponse;
    this.stack = originalErrorStackTrace;
  }
}
