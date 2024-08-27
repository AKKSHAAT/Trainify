import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VideoPlayer } from '../components/VideoPlayer';
import { VideoList } from '../components/VideoList';
import { Navbar } from '../components/Navbar';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// TODO:make video work 
// TODO:make progress work
// TODO:add video.js ffs get this done by 1

export const VidPage = () => {
  const [video, setVideo] = useState({}); 
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/videos/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  
  return (
    <>
      <Navbar />
      <div className="flex w-full h-full">
        <VideoList />
        <div className="flex-1 p-4 ">
          <h1 className=" text-2xl font-bold text-white mb-4">
            <span>{video.order + ' '}</span>
            {video.title}
          </h1>
          {video.fileUrl ? (
            <VideoPlayer fileUrl={video.fileUrl} />
          ) : (
            <p>Loading video...</p> // Optional: loading indicator
          )}
          <div className='bg-[#232c3d] rounded-lg p-4 my-4'>
            <h2 className='text-xl font-semibold text-white mb-2'>About</h2>
            <p className="text-white text-lg font-normal">{video.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
