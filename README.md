# Eclipse Project

## Overview

Eclipse is a full-stack real-time communication application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). The application features a robust **RESTful API** architecture combined with **Socket.IO** for real-time communication capabilities.

## Architecture

The project follows a **layered architecture** pattern that separates concerns and promotes maintainability:

- **Presentation Layer**: React frontend with component-based architecture
- **API Layer**: Express.js RESTful endpoints for HTTP communication
- **Service Layer**: Business logic and application services
- **Data Access Layer**: MongoDB database operations and repositories
- **Real-time Layer**: Socket.IO for live communication features

## Current Version: v1

### Features

✅ **User Authentication & Authorization**

- Secure user registration and login
- JWT-based authentication
- Session management with refresh tokens
- Protected routes and middleware

✅ **Real-time Communication**

- Socket.IO integration for live messaging
- Friend system (add/accept friend requests)
- Real-time chat functionality
- Online status tracking

✅ **Friend Management**

- Send and receive friend requests
- Accept/decline friend invitations
- Friends list management
- Real-time friend status updates

### Technology Stack

**Frontend:**

- React 18+ with Hooks
- Socket.IO Client
- TailwindCSS for styling
- React Router for navigation

**Backend:**

- Node.js with Express.js
- Socket.IO for real-time features
- MongoDB with native driver
- JWT for authentication
- bcrypt for password hashing

**Development Tools:**

- Vite for build tooling
- ESLint for code linting
- Docker for containerization
- Git for version control

## Upcoming Features (Roadmap)

🚧 **Enhanced Friend Search**

- Advanced user search functionality
- Friend discovery and recommendations
- Search filters and sorting

🚧 **AI Assistant Integration**

- Intelligent chat assistance
- Smart message suggestions
- Automated moderation features

🚧 **Video & Audio Chat**

- WebRTC integration
- Voice calls between friends
- Video conferencing capabilities
- Screen sharing functionality

🚧 **File Sharing**

- Document upload and sharing
- Image sharing in chats
- File preview capabilities
- Cloud storage integration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Eclipse
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env.development`
   - Configure your MongoDB connection string
   - Set JWT secrets and other environment variables

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Project Structure

```
Eclipse/
├── src/
│   ├── backend/           # Server-side code
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── database/      # Data access layer
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API route definitions
│   │   └── utils/         # Utility functions
│   └── frontend/          # Client-side code
│       ├── components/    # React components
│       ├── Context/       # React context providers
│       ├── utils/         # Client utilities
│       └── assets/        # Static assets
├── docs/                  # Documentation
├── tests/                 # Test suites
└── docker/               # Docker configuration
```

## API Documentation

The application provides RESTful APIs for:

- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Friends**: `/api/friends/*`
- **Messages**: Real-time via Socket.IO

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and architecture patterns
- Write meaningful commit messages
- Add appropriate documentation for new features
- Ensure all tests pass before submitting PRs

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Join our community discussions

---

**Eclipse v1** - Building the future of real-time communication 🚀
