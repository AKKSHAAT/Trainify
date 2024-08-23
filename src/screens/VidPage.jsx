import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VideoPlayer } from '../components/VideoPlayer'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const VidPage = () => {
  const [video, setVideos] = useState([]); 
  const [error, setError] = useState(null); 
  const { id } = useParams(); 

  useEffect(()=>{
      let res = axios.get(`${backendUrl}/api/videos/${id}`)
          .then(res=>{
              setVideos(res.data);
          })
          .catch(err=>{
              setError(err.msg);
          })
  }, []);
  
  return (
    <>
        <h1>
          <span>
            {video.order}
          </span>
            {video.title}
        </h1>
        <VideoPlayer fileUrl={video.fileUrl} />
        <p>{video.description}</p>
    </>
  )
}
