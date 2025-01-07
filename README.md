# Fitness Tracker App

A user-friendly fitness tracker application that allows users to log their workouts, monitor progress, and stay motivated to achieve their fitness goals.

## User Journeys

1. [Sign Up and Log In](docs/journeys/sign-up-and-log-in.md) - Create an account and access the app securely.
2. [Log a Workout](docs/journeys/log-a-workout.md) - Record your daily workouts with ease.
3. [View Progress](docs/journeys/view-progress.md) - Track your fitness progress over time.
4. [Edit Profile](docs/journeys/edit-profile.md) - Customize your user profile and settings.
5. [Receive Notifications](docs/journeys/receive-notifications.md) - Get timely reminders and updates.
6. [Generate Reports](docs/journeys/generate-reports.md) - Create detailed reports of your fitness activities.

## External API Services

- **Supabase:** Used for authentication and managing user data securely.
- **Resend:** Utilized for sending transactional emails such as password resets and notifications.
- **Sentry:** Implements error logging to monitor and fix issues efficiently.
- **Umami Analytics:** Tracks user interactions and engagement within the app.

## Environment Variables

All required environment variables are listed in the `.env` file. Ensure they are properly configured before deploying the app.

## Design Details

The app uses Tailwind CSS for styling, ensuring a responsive and elegant design. Design elements such as color palette and fonts are defined in the `src/index.css` file.

---