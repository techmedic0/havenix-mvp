# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Initial setup of `CHANGELOG.md` for tracking project updates.

## [2025-03-17] - Initial Summary
### Added
- **Project Setup & Deployment**
  - Configured Vite + React for frontend development.
  - Integrated Supabase for authentication and database.
  - Fixed GitHub Pages 404 issue by updating `vite.config.js`.
  - Learned how to reverse committed changes in GitHub.

- **Authentication & User Management**
  - Implemented Supabase Auth for user login and session management.
  - Used `onAuthStateChange` to track user login/logout.
  - Redirected users based on authentication status in `App.jsx`.
  - Extracted user roles (student, landlord, etc.) from Supabase metadata.

- **Dashboard & Navigation**
  - Built Student Dashboard to display available properties.
  - Created Property Details Page to show full property info.
  - Implemented role-based routing (landlords can add properties, students can only browse).
  - Used `react-router-dom` for navigation and `ScrollToTop` for better UX.

- **Property Listings & Data Handling**
  - Fetched property data from Supabase and displayed it dynamically.
  - Handled missing images & descriptions gracefully.
  - Allowed students to view property details via dynamic routes.
  - Added a landlord dashboard (in progress) for property management.

- **Styling & UI Enhancements**
  - Enforced CSS in separate files instead of inline styles.
  - Improved responsive layouts using CSS grid and flexbox.
  - Enhanced error handling for failed image loads and missing data.

## [Upcoming]
- Implement landlord dashboard for property management.
- Implement contact landlord functionality.
- Add search & filtering for property listings.
- Enhance UI animations and overall design.
- Optimize loading states and error handling.

---

> **Note:** All changes will be documented here moving forward. Ensure to commit updates regularly!
