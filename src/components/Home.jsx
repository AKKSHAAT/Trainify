import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


export const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [videos, setVideos] = useState([]); // State to hold video data
  const [error, setError] = useState(null); // State to hold any errors

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/videos/`);
        setVideos(response.data);
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchVideos(); // Call the function to fetch videos on component mount
  }, []);

  return (
    <>
      <div>
        {error && <p>Error: {error}</p>} {/* Display error if there is one */}
        <ul>
          {videos.map((video) => (
            <li key={video._id}> 
              <Link to={`/video/${video._id}`}>{video.title}</Link>
              <p>{video.description.slice(0,20)}</p>
              <p>{video.duration} minutes</p> {/* Display video duration */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};


