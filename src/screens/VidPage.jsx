import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { VideoList } from '../components/VideoList';
import { Navbar } from '../components/Navbar';
import VideoJS from '../components/VideoJs';
import useStore from '../store/useStore.js';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const VidPage = () => {
  const [video, setVideo] = useState({});
  const [error, setError] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const { id } = useParams();

  const userProgress = useStore((state) => state.userProgress);
  const updateUserProgress = useStore((state) => state.updateVideoProgress);
  const userId = useStore((state) => state.userData.id) || localStorage.getItem("userId");

  const playerRef = useRef(null);
  const VideoPlayerOptions = {
    controls: true,
    responsive: true,
    sources: [
      {
        src: videoLink,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on('waiting', () => {});
    player.on('dispose', () => {});
  };

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/videos/${id}`)
      .then((res) => {
        setVideo(res.data);
        console.log(`video:: ${res.data}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  useEffect(() => {
    setVideoLink(`${backendUrl}/api/videos/stream/${video.fileUrl}`);
  }, [video]);

  useEffect(() => {
    const player = playerRef.current;
    let intervalId;

    const updateProgress = () => {
      if (player) {
        const currentTime = player.currentTime();
        // Save progress in localStorage
        localStorage.setItem('videoProgress', JSON.stringify({
          videoId: video._id,
          progress: currentTime,
          completed: player.ended()
        }));

        // Update progress to backend
        axios.post(`${backendUrl}/api/progress/`, {
          userId,
          videoId: video._id,
          progress: currentTime,
          completed: player.ended()
        }).then(() => {
          console.log('User progress updated');
        }).catch((error) => {
          console.error('Error updating user progress:', error);
        });
      }
    };

    if (player) {
      intervalId = setInterval(updateProgress, 10000); // Update every 10 seconds

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [video._id, userId]);

  useEffect(() => {
    // Function to check if the video is completed and update progress
    const checkCompletion = () => {
      if (playerRef.current) {
        const player = playerRef.current;
        player.on('ended', async () => {
          const currentTime = player.currentTime();
          const progress = userProgress.find((p) => p.videoId === video._id);
  
          // Update progress if not already completed
          if (progress) {
            try {
              // Update progress and completion status
              await axios.post(`${backendUrl}/api/progress/`, {
                userId,
                videoId: video._id,
                progress: currentTime, // Send the watched progress
                completed: true
              });
              
              // Update local progress
              updateUserProgress(video._id, { progress: currentTime, completed: true });
              console.log('User progress updated');
            } catch (error) {
              console.error('Error updating user progress:', error);
            }
          }
        });
      }
    };
  
    checkCompletion();
  }, [userProgress, video, userId, updateUserProgress]);
    
  return (
    <>
      <Navbar title={video.title} order={video.order} />
      <div className="flex w-full h-full">
        <VideoList />
        <div className="flex-1 p-4">
          {videoLink ? (
            <VideoJS options={VideoPlayerOptions} onReady={handlePlayerReady} />
          ) : (
            <p>Fed up</p>
          )}

          <div className="bg-[#232c3d] rounded-lg p-4 my-4">
            <h2 className="text-xl font-semibold text-white mb-2">About</h2>
            <p className="text-white text-lg font-normal">{video.description}</p>

            {userProgress && userProgress.length > 0 ? (
              userProgress.map((progress) => (
                <h1 key={progress.videoId} id={progress.videoId}>
                  {progress.completed ? 'Completed' : 'Not completed'}
                </h1>
              ))
            ) : (
              <p>No progress data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
