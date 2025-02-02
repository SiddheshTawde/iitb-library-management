# IITB Library Management System

This is a library management system for the Indian Institute of Technology, Bombay. The system is built using Next.js, React, Prisma, Supabase, and other modern web technologies.

This documentation provides an in-depth overview of the project, including its structure, key components, actions, hooks, utilities, configuration, scripts, and environment variables.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Components](#components)
- [Actions](#actions)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```markdown
.env
.gitignore
.next/
.vscode/
components.json
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
prisma/
public/
README.md
src/
tailwind.config.ts
tsconfig.json
```

## Database Schema

The database schema is defined using Prisma. The schema includes the following models:

- **User**: Represents a user in the system.
- **Book**: Represents a book in the library.
- **Loan**: Represents a loan of a book to a user.

You can find the schema definition in `prisma/schema.prisma`.

## Components

The project includes the following key components:

- **Header**: The header component of the application.
- **Footer**: The footer component of the application.
- **BookList**: Displays a list of books.
- **UserProfile**: Displays user profile information.

Components are located in the `src/components` directory.

## Actions

Actions are functions that perform specific tasks in the application. Key actions include:

- **fetchBooks**: Fetches a list of books from the database.
- **createUser**: Creates a new user in the system.
- **loanBook**: Records a loan of a book to a user.

Actions are located in the `src/actions` directory.

## Hooks

Custom hooks are used to encapsulate reusable logic. Key hooks include:

- **useFetchBooks**: Custom hook to fetch books.
- **useUserProfile**: Custom hook to fetch and update user profile information.

Hooks are located in the `src/hooks` directory.

## Utilities

Utility functions are used to perform common tasks. Key utilities include:

- **formatDate**: Formats a date string.
- **calculateLateFees**: Calculates late fees for overdue books.

Utilities are located in the `src/utils` directory.

## Configuration

Configuration files include:

- **next.config.ts**: Next.js configuration.
- **tailwind.config.ts**: Tailwind CSS configuration.
- **eslint.config.mjs**: ESLint configuration.

Configuration files are located in the root directory.

## Scripts

Key scripts include:

- **dev**: Starts the development server.
- **build**: Builds the application for production.
- **start**: Starts the production server.

Scripts are defined in the `package.json` file.

## Environment Variables

Environment variables are used to configure the application. Key variables include:

- **DATABASE_URL**: The URL of the database.
- **NEXT_PUBLIC_API_URL**: The URL of the API.

Environment variables are defined in the `.env` file.
