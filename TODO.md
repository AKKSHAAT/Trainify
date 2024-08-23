# TODO List for Full Stack Training Module

## General
- [ ] **Project Setup**
  - [ ] Initialize a new project with `npm init` or `yarn init`.
  - [ ] Install necessary dependencies for both frontend and backend.

## Frontend (React)
- [ ] **Setup React App**
  - [ ] Create a new React project using `create-react-app` or similar.
  - [ ] Install dependencies such as `react-router-dom` and `video.js`.

- [ ] **Implement UI Components**
  - [ ] **Video Library**
    - [ ] Create a component to list video topics.
    - [ ] Display video metadata (title, description).
  - [ ] **Video Player**
    - [ ] Implement a video player using `video.js`.
    - [ ] Ensure sequential video playback with no fast forward or skip options.
    - [ ] Implement functionality to resume playback from the last stop.
    - [ ] Implement back navigation to previously watched videos.
  - [ ] **Progress Tracking**
    - [ ] Display user’s progress as a percentage completed.
    - [ ] Update progress on video completion.

- [ ] **Routing**
  - [ ] Set up routing using `react-router-dom` to navigate between components.
  - [ ] Ensure routes for video library, video player, and progress tracking.

## Backend (Node.js with Express)
- [ ] **Setup Server**
  - [ ] Initialize an Express server.
  - [ ] Connect to MongoDB using Mongoose.
  - [ ] Configure environment variables using `.env` file.

- [ ] **Define Models**
  - [ ] **Video Model**
    - [ ] Create a Mongoose schema for videos.
    - [ ] Include fields for title, description, URL.

- [ ] **Create Routes**
  - [ ] **Video Routes**
    - [ ] Create API endpoints to fetch video list and video details.
    - [ ] Implement logic to handle user progress.

- [ ] **Handle Requests**
  - [ ] Implement API logic to support sequential video playback.
  - [ ] Implement logic to save and retrieve user progress.

## Deployment
- [ ] **Prepare for Deployment**
  - [ ] Ensure all environment variables are set for production.
  - [ ] Set up deployment configuration for frontend and backend.

- [ ] **Deploy Application**
  - [ ] Deploy the frontend to a hosting service (e.g., Vercel, Netlify).
  - [ ] Deploy the backend to a hosting service (e.g., Heroku, AWS).

## Documentation
- [ ] **Code Documentation**
  - [ ] Write clear comments and documentation within the code.
  - [ ] Document API endpoints and usage.

- [ ] **Project Documentation**
  - [ ] Create a README file detailing project setup, features, and usage.
  - [ ] Include any relevant diagrams or architecture explanations.

## Testing
- [ ] **Frontend Testing**
  - [ ] Test UI components and user interactions.
  - [ ] Ensure video playback functionality works as expected.

- [ ] **Backend Testing**
  - [ ] Test API endpoints for correct data retrieval and error handling.
  - [ ] Test database operations and ensure data integrity.

- [ ] **End-to-End Testing**
  - [ ] Perform end-to-end tests to ensure the entire system works seamlessly.

## Evaluation
- [ ] **Code Quality**
  - [ ] Ensure code adheres to best practices and is well-organized.
  - [ ] Use linters and formatters to maintain code quality.

- [ ] **Demo Preparation**
  - [ ] Prepare a working demo of the application.
  - [ ] Record a demo video if required.

- [ ] **Submission**
  - [ ] Submit the application according to the provided guidelines.
  - [ ] Include all documentation and required files.

