# ShopLux

ShopLux is a modern, responsive e-commerce storefront built as a front-end capstone project. It integrates with a REST API for authentication, products, cart, checkout, profile, and reviews.

## Features

- **Authentication** — Register, Login, and Forgot/Reset Password (email verification code flow)
- **Product catalog** — Search, sort (name/price/rating), filter by rating and price range, pagination
- **Product details** — Image gallery, quantity selector, reviews with star ratings
- **Cart** — Add/remove items, update quantities, clear cart, live order summary
- **Checkout** — Cash on delivery or credit card (client-side validated) payment flow
- **Profile** — Account info and order history
- **Internationalization** — Full English / Arabic translation with automatic RTL layout switching
- **Theming** — Light / dark mode toggle, persisted in local storage
- **Protected routes** — Products, cart, checkout, and profile require authentication

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [MUI (Material UI)](https://mui.com/) with a custom theme and RTL support (`stylis-plugin-rtl`)
- [React Router v7](https://reactrouter.com/)
- [TanStack React Query](https://tanstack.com/query) for server state and caching
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) for form validation
- [Zustand](https://zustand-demo.pmnd.rs/) for auth state
- [react-i18next](https://react.i18next.com/) for localization
- [Axios](https://axios-http.com/) for API requests

## Getting Started

### 1. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure environment variables

Create a `.env` file in the project root:

\`\`\`
VITE_BURL="https://your-api-base-url/api"
\`\`\`

### 3. Run the dev server

\`\`\`bash
npm run dev
\`\`\`

### 4. Build for production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
  api/            # axios instances (public + authenticated)
  components/     # shared UI components (navbar, footer, protected route)
  context/        # theme (light/dark + RTL) context
  hooks/          # React Query hooks for all API calls
  layout/         # main app layout (navbar + outlet + footer)
  locales/        # en / ar translation files
  pages/          # route-level pages
  store/          # zustand auth store
\`\`\`

## Deployment (Render)

This is a static Vite build, so on Render:

- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- Add the `VITE_BURL` environment variable in the Render dashboard (Environment tab) before building.