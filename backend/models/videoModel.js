import mongoose  from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Duration in seconds
  }
});

const Video = mongoose.model('Video', videoSchema);

export { Video };
