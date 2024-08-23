import express from 'express';
import { User } from '../models/userModel.js';
import { Video } from '../models/videoModel.js';
import  {UserProgress} from '../models/userProgressModel.js';

const router = express.Router();

router.get('/progress', async (req, res) => {
    try {
      const { userId, videoId } = req.query; // Use req.query for GET request parameters
  
      if (!userId || !videoId) {
        return res.status(400).json({ message: "userId and videoId are required" });
      }
  
      const userProgress = await UserProgress.findOne({ userId: userId, 'video.videoId': videoId });
  
      if (!userProgress) {
        return res.status(404).json({ message: "No progress found for this video" });
      }
  
      res.send(userProgress.video);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


router.post('/progress',async (req, res)=>{
try {
    const { userId, videoId, completed } = req.body; 
    const progress = new UserProgress({
        userId,
        video: {
        videoId,
        completed: completed || false, 
        },
    });

    const result = await progress.save();
    res.send(result);
    } catch (err) {
    res.status(500).send(err.message);
    }
});

export default router;