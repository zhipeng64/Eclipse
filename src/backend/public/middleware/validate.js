import { validationResult } from "express-validator";

// Generate validation error (if any) from express-validator validation chains
const validateResult = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty) {
    return res.status(400).send({
      errors: results
        .array()
        .map(({ path, msg }) => ({ field: path, msg: msg })),
    });
  }
  next();
};

export { validateResult };
