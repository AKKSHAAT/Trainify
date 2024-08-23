import express from 'express';
import { Video } from '../models/videoModel.js';  

import {videos} from './db.js';
const router = express.Router();
// GET /api/videos: Fetch the list of videos.
// GET /api/videos/:id: Fetch a specific video by ID.
// POST /api/progress: Save user progress.
// GET /api/progress/:userId: Fetch progress for a specific user.

router.get('/', async (req, res) => {
  try {
    console.log("pingged");
    
    const vids = await Video.find({});
    res.send(vids);   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const vids = await Video.findOne({_id:id});
    res.send(vids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/progress', async (req, res)=>{
  const {userId, videoId, progress} = req.body;
  res.send(videoId);
})

router.get('/progress/:userId', (req, res)=>{
  TODO://return progrsss
  res.send('will return progrsss');
});
// GET /api/progress/:userId: Fetch progress for a specific user.


export default router;


