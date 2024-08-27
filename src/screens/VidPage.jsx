import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VideoPlayer } from '../components/VideoPlayer';
import { VideoList } from '../components/VideoList';
import { Navbar } from '../components/Navbar';
import VideoJS from '../components/VideoJs';  

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// TODO:make video work 
// TODO:make progress work
// TODO:add video.js ffs get this done by 1

export const VidPage = () => {
  const [video, setVideo] = useState({}); 
  const [error, setError] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const { id } = useParams();

  const playerRef = useRef(null);
  const VideoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "video/mp4"
      }
    ]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/videos/${id}`)
      .then((res) => {
        setVideoLink(`${backendUrl}/api/videos/stream/Video1.mp4`);
        setVideo(res.data)
        console.log(videoLink);
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
            {videoLink}
          </h1>
          { videoLink ? (
              <VideoJS 
                options={VideoPlayerOptions}
                onReady={handlePlayerReady}
              />
            ) : (
              <p>Fed up</p>
            )

          }
          
          <div className='bg-[#232c3d] rounded-lg p-4 my-4'>
            <h2 className='text-xl font-semibold text-white mb-2'>About</h2>
            <p className="text-white text-lg font-normal">{video.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};
