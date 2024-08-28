import express from "express";
import mongoose from "mongoose";
import videoRoutes from './routes/videoRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import userProgressRoute from "./routes/userProgressRoutes.js";
import cors from 'cors';
import 'dotenv/config'; 

const app = express(); 

app.use(cors())
app.use(express.json()); 
app.use('/api/videos', videoRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/progress',userProgressRoute); 

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });
