import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore.js'; // Import the Zustand store

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  // get progress
  const userProgress = useStore((state) => state.userProgress);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/videos/`);
        setVideos(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-1/4 h-screen bg-[#161c28] p-2 overflow-y-auto">
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {videos.map((video, index) => {
          // Check if there's a corresponding entry in userProgress for the current video
          const progressEntry = userProgress.find(
            (progress) => progress.videoId === video._id
          );

          // Extract completed status if it exists, else default to false
          const isCompleted = progressEntry ? progressEntry.completed : false;

          // Determine if the current video should be locked or not
          // The first video is never locked, subsequent videos are locked if the previous video is not completed
          const isLocked = index > 0 && !userProgress.some((progress) => progress.videoId === videos[index - 1]._id && progress.completed);

          return (
            <li key={video._id} className="bg-[#1c2431] m-2 p-4 rounded-lg">
              {isLocked ? (
                <div className='cursor-no-drop'>
                  <h1 className="font-bold text-white">{video.title}</h1>
                  <div className="text-[#92acc9] text-sm">
                    <p>{video.description.slice(0, 40) + ' ...'}</p>
                    <p>{video.duration}s</p>
                    <p className="font-light">Video {video.order}</p>
                    <p className="font-light text-red-500">
                      Locked: Yes (Complete previous videos to unlock)
                    </p>
                  </div>
                </div>
              ) : (
                <Link to={`/video/${video._id}`}>
                  <h1 className="font-bold text-white">{video.title}</h1>
                  <div className="text-[#92acc9] text-sm">
                    <p>{video.description.slice(0, 40) + ' ...'}</p>
                    <p>{video.duration}s</p>
                    <p className="font-light">Video {video.order}</p>
                    <p className="font-light">
                      Locked: No
                    </p>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
