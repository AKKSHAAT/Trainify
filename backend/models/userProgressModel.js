import mongoose from 'mongoose';

// Define a schema for individual video progress
const videoProgressSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the video
    ref: 'Video',
    required: true,
  },
  progress: {
    type: Number, // Stores the progress value (e.g., percentage of video watched)
    default: 0,
  },
  completed: {
    type: Boolean, // Stores whether the video has been completed
    default: false,
  },
  lastWatchedAt: {
    type: Date, // Tracks the last time this video was watched
    default: Date.now,
  }
});

// Define the main user progress schema
const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user
    ref: 'User',
    required: true,
  },
  videos: [videoProgressSchema] // Array of video progress objects
});

// Create a model from the schema
const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export { UserProgress };
