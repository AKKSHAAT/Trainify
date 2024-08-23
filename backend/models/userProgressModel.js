import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  video: {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    watchedDuration: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastWatchedAt: {
      type: Date,
      default: Date.now,
    }
  }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export {UserProgress};
