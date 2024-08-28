import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useStore from '../store/useStore.js';

export const Navbar = ({ title, order }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const userProgress = useStore((state) => state.userProgress);


  useEffect(() => {
    // console.log('userProgress @navbar:', userProgress);
    console.log(order);
    setProgress(() => Math.round((order / 3) * 100));
  }, [order, userProgress]); 

  function handleBack() {
    navigate('/');
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
    </nav>
  );
};
