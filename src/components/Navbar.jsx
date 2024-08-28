import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useStore from '../store/useStore.js';

export const Navbar = ({ title, order }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  
  const userProgress = useStore((state) => state.userProgress);
  
  useEffect(() => {
    if(localStorage.getItem('userId') || localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
    // Calculate total number of videos
    const totalVideos = 3; // Replace this with the actual number of videos if dynamic

    // Count the number of completed videos
    const completedVideos = userProgress.filter((p) => p.completed).length;

    // Calculate progress percentage
    const percentage = Math.round((completedVideos / totalVideos) * 100);

    setProgress(percentage);
  }, [userProgress]); 

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  function handleLogin() {
    navigate('/login');
  }

  

  return (
    <nav className='h-12 bg-[#1c2431] m-2 py-2 px-4 rounded-md flex justify-between'>
      <Link to="/" className='text-blue-600 text-lg font-black tracking-widest'>Trainify</Link>
      <h1 className="text-2xl font-bold text-white mb-4">
        {title}
      </h1>
      {order ? (
        <h1 className="text-2xl font-bold text-white px-2 rounded-full bg-[#141924] font-[arial]">
          {progress}%
        </h1>
      ) : null}
      {isLoggedIn ? (
        <button type="submit" onClick={handleLogout} className=" w-fit px-2 py-1 bg-blue-500 text-white rounded">
              Log out
        </button>
      ) : (
        <button type="submit" onClick={handleLogin} className="w-fit px-2 py-1 bg-blue-500 text-white rounded">
              Login
        </button>
      )}
    </nav>
  );
};
