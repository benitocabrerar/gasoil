# Gasoil React App

This project is a React application that integrates with Firebase for authentication and Firestore. It also contains a Firebase Functions project and a Data Connect schema.

## Requirements

- Node.js 18 or later
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your Firebase credentials.
3. Start the development server:
   ```bash
   npm start
   ```

## Building for Production

Run `npm run build` to create an optimized production build in the `build` directory.

## Deployment

The project is configured to deploy using `gh-pages`. Use:

```bash
npm run deploy
```

## Firebase Functions

The `functions` directory contains Cloud Functions written in Node.js. Install dependencies and deploy them with Firebase CLI:

```bash
cd functions
npm install
npm run deploy
```


