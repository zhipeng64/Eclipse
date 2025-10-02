// Centralized frontend config built from Vite environment variables.
// Export plain values so other files can import a stable object instead of
// accessing `import.meta.env` directly everywhere.

// Note that Vite automatically loads .env.development or vite.env.production
// based on whether it is a development or production build
const config = {
  VITE_BACKEND_URL: VITE_BACKEND_URL,
  VITE_EVENT_STATUS_INITIALIZE: VITE_EVENT_STATUS_INITIALIZE,
  VITE_EVENT_STATUS_PUSH: VITE_EVENT_STATUS_PUSH,
  VITE_EVENT_STATUS_DELETE: VITE_EVENT_STATUS_DELETE,
};

export default config;
