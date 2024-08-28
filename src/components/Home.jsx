import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { VideoList } from './VideoList';
import { Login } from './Login';
import { Navbar } from './Navbar';

import useStore from '../store/useStore.js';

export const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [user, setUser] = useState(null); 
  // const [userProgress, setUserProgress] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUserProgress, userProgress } = useStore((state) => ({
    setUserProgress: state.setUserProgress,
    userProgress: state.userProgress,
  }));

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    function fetchUser() {
      axios.get(`${backendUrl}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem('userId');
        localStorage.removeItem('token'); 
        navigate('/login'); 
      });
    }

    const fetchUserProgress = async()=>{
      try {
        const response = await axios.get(`${backendUrl}/api/progress/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        setUserProgress(response.data);
      } catch (err) {
        console.error("Error fetching user progress:", err.message);
        setError(err.message);
      }
    }


    if (userId && token) {
      fetchUser();
      fetchUserProgress();
    } else {
      navigate('/login'); 
    }

  }, [navigate, backendUrl]); 

  return (
    <div className='h-full'>
      <Navbar />
      {user ? (
        <div className='flex'>
          <VideoList/>
          <div className='mx-auto text-center p-8 text-8xl font-bold text-white text-wrap'>
            Welcome to <span className="text-blue-600">Trainify!</span>
            <div className='p-4 text-4xl font-bold text-white mb-4'>
              <h1> Hello  
                <span className='text-[#444972]'>
                  {" " + user.username}
                </span>
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {error && <p className="text-center text-red-500">{error}</p>} 
          <Login />
        </div>
      )}
    </div>
  );
};
