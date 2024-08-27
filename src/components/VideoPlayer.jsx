import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import Video.js CSS

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const VideoPlayer = ({ fileUrl }) => {
  const videoRef = useRef(null); // Ref for the video element
  const playerRef = useRef(null); // Ref for the Video.js player instance

  useEffect(() => {
    // Initialize the Video.js player when the component mounts or fileUrl changes
    if (playerRef.current) {
      playerRef.current.dispose(); // Dispose of the previous player instance
    }

    // Create a new Video.js player instance
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      sources: [{
        src: `${backendUrl}/api/videos/stream/${fileUrl}`,
        type: 'video/mp4'
      }],
      fluid: true, // Optional: Makes the player responsive
      autoplay: false,
      preload: 'auto'
    });

    // Clean up the Video.js player instance when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [fileUrl]);

  return (
    <div data-vjs-player>
    {fileUrl ? (
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full rounded-xl border-2 border-[#293347]"
          controls
        />
      </div>
    ) : (
      <p>Loading video...</p>
    )}
    </div>
  );
};
