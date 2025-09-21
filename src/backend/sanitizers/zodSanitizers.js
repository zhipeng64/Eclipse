import { z } from "zod";

// Zod-based input sanitization utilities for non-middleware contexts
const sanitizedStringSchema = z
  .string()
  .trim()
  .transform((val) => val.toLowerCase());

export { sanitizedStringSchema };
