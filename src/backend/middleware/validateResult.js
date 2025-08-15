import { validationResult } from "express-validator";

// Proper middleware
const validateResult = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    console.log(results);
    return res.status(400).send({
      errors: results.array().map(({ path, msg }) => ({
        field: path,
        msg: msg,
      })),
    });
  }
  next();
};

export { validateResult };
