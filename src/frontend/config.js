// Centralized frontend config built from Vite environment variables.
// Export plain values so other files can import a stable object instead of
// accessing `import.meta.env` directly everywhere.
const config = {
  // Backend API base (VITE_BACKEND_URL should include any base path like '/api')
  VITE_BACKEND_URL: "/api",

  // Event status flags used by socket handlers
  VITE_EVENT_STATUS_INITIALIZE: "initialize",
  VITE_EVENT_STATUS_PUSH: "push",
  VITE_EVENT_STATUS_DELETE: "delete",
};

export default config;
