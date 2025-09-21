// Zod-based input validation schemas for use in non-middleware contexts
import { z } from "zod";

// 24-character hex string (length of MongoDB ObjectId)
const roomIdSchema = z
  .string()
  .min(1, "String must not be empty")
  .regex(/^[a-fA-F0-9]+$/, "Must be a valid hex string")
  .length(24, "Must be exactly 24 hex characters");

// Message content validation: max 500 characters per message
const messageContentSchema = z
  .string()
  .min(1, "Message cannot be empty")
  .max(500, "Message cannot exceed 500 characters");

export { roomIdSchema, messageContentSchema };
