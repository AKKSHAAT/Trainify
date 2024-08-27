import express from 'express';
import { readFileSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { Video } from '../models/videoModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = resolve(__dirname, '..');
console.log("baseDir:", baseDir); 

const router = express.Router();

router.get('/stream/:fileName', (req, res) => {
  
  const fileName = req.params.fileName;

  const videoPath = join(baseDir, 'vodz', fileName);
  console.log("Video path:", videoPath);

  try {
    const file = readFileSync(videoPath);
    res.send(file);
  } catch (error) {
    console.error("Error reading video file:", error.message); // Improved error message
    res.status(404).send("Video not found");
  }
});

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
    const vid = await Video.findOne({_id:id});
    console.log(vid);
    
    res.send(vid);
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


