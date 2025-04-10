# Student Job Tracker Fullstack App

Welcome to the **Student Job Tracker** fullstack application. This project is designed to help students keep track of their job applications using a modern MERN stack solution. This repository includes both the backend (Express/Node.js) and frontend (React with TypeScript) projects, as well as additional documentation such as the DSA solution and AI tools usage report.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [DSA Problem](#dsa-problem)
- [Deployment](#deployment)
- [AI Tools & LLMs](#ai-tools--llms)
- [Video Walkthrough](#video-walkthrough)
- [License](#license)

## Overview

The Student Job Tracker enables users to:

- Add job applications (company, role, status, date, link)
- View a list of applications with filtering and sorting options
- Update application status
- Delete an application
- Automatically prevent duplicate submissions (based on company and role, case-insensitive)

## Features

- **CRUD Operations:** Create, Read, Update, and Delete job applications.
- **Filtering and Sorting:** Filter jobs by status and sort by application date.
- **Validation:** Duplicate submission prevention (client and server checks) and URL validation.
- **Notifications:** User feedback via React Toastify.
- **Modern UI:** A sleek, responsive interface built with Tailwind CSS and Heroicons.
- **Modular & Maintainable Code:** Separation of concerns across backend and frontend.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Toastify, Heroicons
- **Backend:** Node.js, Express, MongoDB (Atlas), Mongoose, dotenv, cors
- **Deployment:** Vercel (Frontend & Backend as Serverless functions) or Railway (alternative backend)
- **Others:** Git, GitHub, ChatGPT/GitHub Copilot (for coding support)

## Project Structure

```markdown
student-job-tracker/
├── backend/                # Express backend (API)
│   ├── config/             # Database config (db.js)
│   ├── controllers/        # Business logic (jobController.js)
│   ├── middleware/         # Custom middleware (errorHandler.js)
│   ├── models/             # Mongoose models (Job.js)
│   ├── routes/             # API routes (jobRoutes.js)
│   ├── .env                # Environment variables
│   └── index.js            # Entry point for the backend
├── frontend/               # React frontend (Vite with TypeScript)
│   ├── src/
│   │   ├── components/     # UI components (JobForm.tsx, JobList.tsx)
│   │   ├── services/       # Axios API service (api.ts)
│   │   ├── types/          # Type definitions (job.ts)
│   │   └── App.tsx         # Main App component
│   ├── .env                # Environment variables
│   └── package.json
├── dsa/
│   └── detectDuplicateApplications.ts # DSA solution file
└── README.md              # This overall README
```

## Setup Instructions

### Backend

Please refer to the [backend README](./backend/README-backend.md) for complete instructions on setup, configuration, and deployment.

### Frontend

Please refer to the [frontend README](./frontend/README-frontend.md) for complete instructions on setup and running the React application.

### DSA Problem

The duplicate detection solution is located in the `dsa/` folder as `detectDuplicateApplications.ts`.
It checks for duplicate job entries (company + role, case-insensitive).

## Deployment

- **Backend:** Deployed on Vercel (or Railway) using the provided deployment scripts. Ensure that the `MONGO_URI` is configured in the environment variables.
- **Frontend:** Deployed on Vercel. Update the `.env` file with the API base URL.
- **Live Links:**
  - Backend: [https://demo-nu-indol.vercel.app](https://your-backend.vercel.app)
  - Frontend: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)

## AI Tools & LLMs

In Part 2 of the assignment, I leveraged AI tools (ChatGPT and GitHub Copilot) for:

- Generating boilerplate code and UI/UX suggestions.
- Improving modular code structure.
- Integrating duplicate validations and toast notifications.
- Manual refinements were performed to ensure adherence to project standards and clear understanding of every implemented feature.

For complete details, please see the [AI Tools Usage Report](./AI-Tools-Usage.md).

## Video Walkthrough

A 10–15 minute video walkthrough covers the project features, folder structure, and thought process during development.  
[View Video Walkthrough](https://yourvideolink.com)

## License

[MIT](LICENSE)
