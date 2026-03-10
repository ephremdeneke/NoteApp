# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
/*
backend/
  src/
    server.js
    config/
      db.js
    models/
      Note.js
      User.js                # NEW – user model
    controllers/
      notesController.js
      authController.js      # NEW – login/register logic
    routes/
      notesRouters.js
      authRoutes.js          # NEW – /api/auth routes
    middleware/
      rateLimiter.js
      authMiddleware.js      # NEW – JWT auth check
*/
/*
frontend/
  src/
    main.jsx
    App.jsx
    lib/
      axios.js               # UPDATED – attaches JWT to requests
    pages/
      HomePage.jsx
      CreatePage.jsx
      NoteDetailPage.jsx
      LoginPage.jsx          # NEW – login form
      RegisterPage.jsx       # NEW – signup form
    components/
      Navbar.jsx             # (optional) shows login/logout
      ProtectedRoute.jsx     # (optional) wrapper to guard routes
*/