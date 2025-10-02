// Centralized frontend config built from Vite environment variables.
// Export plain values so other files can import a stable object instead of
// accessing `import.meta.env` directly everywhere.

// Note that Vite automatically loads .env.development or vite.env.production
// based on whether it is a development or production build
const config = {
  // Backend API base (VITE_BACKEND_URL should include any base path like '/api')
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,

  // Event status flags used by socket handlers
  VITE_EVENT_STATUS_INITIALIZE: import.meta.env.VITE_EVENT_STATUS_INITIALIZE,
  VITE_EVENT_STATUS_PUSH: import.meta.env.VITE_EVENT_STATUS_PUSH,
  VITE_EVENT_STATUS_DELETE: import.meta.env.VITE_EVENT_STATUS_DELETE,
};

export default config;
