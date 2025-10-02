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

**User Authentication & Authorization**

- Secure user registration and login
- JWT-based authentication
- Session management with refresh tokens
- Protected routes and middleware

**Real-time Communication**

- Socket.IO integration for live messaging
- Friend system (add/accept friend requests)
- Real-time chat functionality

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

**CI/CD:**

- Github Actions to automate workflow

**Deployment:**

- Amazon ECS with IAM

## Upcoming Features (Roadmap)

**Enhanced Friend Search**

- Advanced user search functionality
- Friend discovery and recommendations
- Friend search filters and sorting

  **AI Assistant Integration**

- Intelligent chat assistance
- Smart message suggestions
- Automated moderation features

  **Video & Audio Chat**

- WebRTC integration
- Voice calls between friends
- Video conferencing capabilities
- Screen sharing functionality

  **File Sharing**

- Document upload and sharing
- Image sharing in chats
- File preview capabilities

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm package manager

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
   - Set JWT secret for signing JWT and other environment variables

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

## API Documentation

The application provides RESTful APIs for:

- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Friends**: `/api/friends/*`
- **Messages**: Real-time via Socket.IO

## Project Version

Eclipse: version 1 (v1)
