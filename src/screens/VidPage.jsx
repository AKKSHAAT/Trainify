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
  const userId = useStore((state) => state.userData.id) || localStorage.getItem("userId"); // Assuming userId is stored in userData

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
    // Function to check if the video is completed
    const checkCompletion = () => {
      if (playerRef.current) {
        const player = playerRef.current;
        player.on('ended', async () => {
          // Find progress for the current video
          const progress = userProgress.find((p) => p.videoId === video._id);

          // Update progress if not already completed
          if (progress && !progress.completed) {
            try {
              await axios.post(`${backendUrl}/api/progress/`, {
                userId,
                videoId: video._id,
                completed: true
              });
              // Update local progress
              updateUserProgress(video._id, { completed: true });
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
