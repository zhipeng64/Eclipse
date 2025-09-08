import { closeMongoConnection } from "./database/connection.js";

// In case the backend may terminate due to runtime errors (which don't generate signals) or signals,
// handle it gracefully by performing any cleanup operations.
const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  // Close DB, server, cleanup, etc.
  await closeMongoConnection();
  process.exit(0);
};

const initializeGracefulShutdown = () => {
  // OS signals
  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);

  // Runtime errors
  process.on("uncaughtException", async (err) => {
    console.error(err);
    await gracefulShutdown();
  });
  process.on("unhandledRejection", async (reason) => {
    console.error(reason);
    await gracefulShutdown();
  });
};

export default initializeGracefulShutdown;
