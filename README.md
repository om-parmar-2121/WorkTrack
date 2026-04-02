# StaffSphere

StaffSphere is a web-based HR management system for employee onboarding, attendance tracking, leave approvals, and internal notifications. It uses a React frontend and an Express/MongoDB backend with role-based access for HR and Employee users.

For demo and learning purposes only. Not intended for production use.

## Project Structure

```text
StaffSphere/
├── client/ # React app for users, HR, and dashboards
├── server/ # Express REST API and MongoDB models
├── .gitignore # Git ignore rules
└── README.md # Project documentation
```

## Features

- Role-based login and registration flow
- HR dashboard for employee management and approval actions
- Employee dashboard for leave and attendance workflows
- Leave request creation, review, approval, and rejection
- Notification flow for key HR events
- JWT-based authentication with protected routes
- Responsive UI for desktop and mobile usage

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, React Router, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Authentication | JWT, bcrypt |
| Styling | Tailwind CSS, custom UI components |

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/om-parmar-2121/StaffSphere.git
cd StaffSphere
```

### 2. Client Setup

```bash
cd client
npm install
npm run dev
```

### 3. Server Setup

```bash
cd ../server
npm install
npm run dev
```

Configure the backend environment variables before running the server.


## Available Scripts

### Client

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

### Server

- `npm run dev` - start the server with nodemon
- `npm start` - start the server in production mode

## Development Notes

- HR users are activated immediately after registration.
- Employee registrations remain pending until approved by HR.
- Auth middleware supports both bearer tokens and cookie-based tokens.
- The project uses modular routes, controllers, models, and services to keep the codebase maintainable.

## Disclaimer

This project is for educational and demonstration purposes only. It is not designed for live production usage.

## Author

- Om Parmar
