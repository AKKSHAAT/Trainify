import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const VideoPlayer = ({fileUrl}) => {

  return (
    <> 
    {
      <video
            key={fileUrl} // Use fileUrl as key to force remount
            className='w-full rounded-xl border-2 border-[#293347]'
            controls
          >
              <source src={`${backendUrl}/api/videos/stream/${fileUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
        </video>
    }
    </>
  )
}
