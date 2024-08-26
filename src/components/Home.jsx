import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { VideoList } from './VideoList';
import { Login } from './Login';

export const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function fetchUser() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (userId && token) {
        axios.get(`${backendUrl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          console.error(`Error fetching user data: ${err}`);
          setError("Failed to fetch user data. Please try again.");
          localStorage.removeItem('userId');
          localStorage.removeItem('token'); 
          navigate('/login'); 
        });
      } else {
        setError("User not logged in. Please log in.");
        navigate('/login'); 
      }
    }
    fetchUser();
  }, [navigate, backendUrl]); 

  return (
    <>
      {user ? (
        <div className='flex'>
          <VideoList />
          <div className='mx-auto text-center p-8 text-8xl font-bold text-white text-wrap'>
            Welcome to Trainify!
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
    </>
  );
};
