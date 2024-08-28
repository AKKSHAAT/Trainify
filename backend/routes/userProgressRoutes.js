import express from 'express';
import { User } from '../models/userModel.js';
import { Video } from '../models/videoModel.js';
import  {UserProgress} from '../models/userProgressModel.js';
import { authMiddleware } from '../routes/middleware.js';
import mongoose from 'mongoose';

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


router.post('/', async (req, res) => {
  const { userId, videoId, completed, progress } = req.body;

  try {
    console.log("completed:", completed);

    // Use updateOne to directly update the video in the array
    const result = await UserProgress.updateOne(
        {
            userId: userId,
            'videos.videoId': videoId
        },
        {
            $set: {
                'videos.$.completed': completed,
                'videos.$.progress': progress
            }
        }
    );

    // Check if the update modified any documents
    if (result.nModified === 0) {
        // If no progress is found or no modification occurred, create a new progress entry
        const newProgress = new UserProgress({
            userId,
            videos: [{ videoId, completed , progress}]
        });

        await newProgress.save()
            .then((savedProgress) => {
                console.log('New progress created:', savedProgress);
            })
            .catch(err => {
                console.log('Error creating progress:', err);
            });
    } else {
        console.log('Progress updated successfully');
    }
    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (err) {
      console.log('Catch block error:', err);
      res.status(500).json({ error: 'Failed to update progress' });
}


});


export default router;