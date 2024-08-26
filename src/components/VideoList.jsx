import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

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
      {/* Adjusted width to a fraction for responsive design */}
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {videos.map((video) => (
          <li key={video._id} className="bg-[#1c2431] m-2 p-4 rounded-lg">
            <Link to={`/video/${video._id}`}>
              <h1 className="font-bold text-white">{video.title}</h1>
              <div className="text-[#92acc9] text-sm">
                <p>{video.description.slice(0, 40) + ' ...'}</p>
                <p>{video.duration}s</p>
                <p className="font-light">Video {video.order}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
