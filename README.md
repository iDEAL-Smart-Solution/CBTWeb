# iDEAL CBT Frontend

This repository contains the web application for iDEAL CBT, a school-focused computer-based testing and academic management system. The application provides role-based experiences for school administrators, staff, students, and platform administrators.

## Product Overview

iDEAL CBT helps schools manage their academic assessment workflows through a browser-based portal. Administrators maintain classes, student and staff accounts, subjects, academic sessions, exams, and subscription settings. Staff manage their assigned subjects and exams and review results. Students view assigned exams, complete assessments, and see exam completion status.

The frontend connects to the iDEAL CBT backend API for authentication, school data, exam delivery, results, payments, and other system workflows. It uses role-aware routes and layouts to present the features available to each user type.

## Tech Stack

- React 18
- Vite 5 with the React SWC plugin
- JavaScript / JSX
- React Router DOM
- Axios for API requests
- Zustand for client-side state management
- Tailwind CSS 4
- Lucide React and React Icons
- Jest and React Testing Library

## Project Structure

```text
CBTWeb/
|-- public/                         # Static public assets
|-- src/
|   |-- Component/                  # Shared UI components grouped by feature
|   |-- Context/                    # Shared React contexts, including notifications
|   |-- Constant/                   # API base URL and Axios client
|   |-- Pages/                      # Route-level screens grouped by feature
|   |   |-- Admin/                  # Admin, backup, payment, and migration screens
|   |   |-- Acad/                   # Academic session management
|   |   |-- Class/                  # Class management
|   |   |-- Exam/                   # Exam listing, instructions, and taking exams
|   |   |-- Result/                 # Result views and theory score uploads
|   |   |-- Student/                # Student management, profiles, and promotion
|   |   `-- ...                    # Auth, school, staff, subject, and question screens
|   |-- Zustand/                    # Feature state stores and API actions
|   |-- App.jsx                     # Routes and role-based route loaders
|   |-- main.jsx                    # React application bootstrap
|   |-- App.css                     # App-level styles
|   `-- index.css                   # Global styles and Tailwind setup
|-- __mocks__/                      # Jest asset mocks
|-- errorPage.jsx                   # Shared route error screen
|-- index.html
|-- package.json
|-- vite.config.js                  # Vite and IIS build configuration
|-- web.config                      # IIS hosting configuration
`-- README.md
```

## Key User Flows

### School administrator

- Sign in and manage classes, students, staff, and subjects
- Create exams, upload questions, and review results
- Manage academic sessions, student promotion, and clearance
- Configure school details, payments, backups, and student migration

### Staff

- View assigned subjects and exams
- Manage assessment content available to their role
- Upload theory scores and review student results

### Student

- Sign in to view assigned exams
- Read exam instructions, take exams, and view completion status
- Update profile information and view academic results

### Platform administrator

- Manage schools and platform admin users
- Review school profiles and platform-level operations

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm (or Yarn)
- Access to an iDEAL CBT backend API

### Install dependencies

From the repository root:

```bash
npm install
```

The repository includes both `package-lock.json` and `yarn.lock`. Use one package manager consistently for a given working copy.

### Configure the backend URL

The API base URL is currently set in [`src/Constant/index.js`](src/Constant/index.js). The committed default points to the hosted iDEAL CBT API. To use a local backend, change `BASE_URL` to the backend address, for example `http://localhost:5026`.

The frontend sends API requests to that base URL and expects the backend API routes under `/api/v1`. The backend must be running and configured to allow requests from the frontend origin.

### Start the development server

```bash
npm run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

### Build for production

```bash
npm run build
```

The static production bundle is written to `dist/`. To serve that bundle locally:

```bash
npm run preview
```

### Build for IIS

```bash
npm run build:iis
```

This build uses relative asset paths and copies `web.config` into `dist/` for IIS hosting.

## Quality Checks

Run the configured ESLint checks with:

```bash
npm run lint
```

Run the Jest test suite with:

```bash
npm test
```

## API Connection

This frontend is designed to work with the backend in the sibling repository, [`../CBTSoftware`](../CBTSoftware). Authentication, school-scoped rules, exam processing, subscription logic, and persistent data are handled by that backend. API request state and actions are organized in `src/Zustand`, with the shared Axios client in `src/Constant/axiosInstance.js`.

## Notes

This repository contains the browser client only. It does not include the backend database or API implementation. Route access is selected from the signed-in user's role, and most application data requires a working backend connection.
