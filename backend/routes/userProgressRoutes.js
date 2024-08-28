import express from 'express';
import { User } from '../models/userModel.js';
import { Video } from '../models/videoModel.js';
import  {UserProgress} from '../models/userProgressModel.js';
import { authMiddleware } from '../routes/middleware.js';

const router = express.Router();

router.get('/:userId', authMiddleware, async (req, res) => {
  console.log("pingged proress:get");
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const { userId } = req.params;
  // const { videoId } = req.query;

  if (!userId ) {
    return res.status(400).json({ message: "userId and are required" });
  }

  try {
    let userProgress = await UserProgress.findOne({userId});

    if (!userProgress) {
      const vIds = ['66c864e37c054fbe9ab1f4a8', '66c864e37c054fbe9ab1f4a9', '66c864e37c054fbe9ab1f4aa'];
      const newProgress = {
        userId,
        videos: [
          {
            videoId : vIds[0]
          },
          {
            videoId : vIds[1]
          },
          {
            videoId : vIds[2]
          }
        ]
      };
      userProgress = await UserProgress.create(newProgress)
        .then(userProgress=>{
          return res.status(200).json(userProgress.videos);
        })
        .catch(err=>console.log(err));
    }

    return res.json(userProgress.videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


router.post('/vIds',async (req, res)=>{
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