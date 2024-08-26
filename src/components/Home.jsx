import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { VideoList } from './VideoList';


export const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [user, setUser ] = useState(null); // State to hold video data
  const [error, setError] = useState("err"); // State to hold any errors

  useEffect(() => {
    function fetchUser() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if(userId) {
        const user = axios.get(`${backendUrl}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(user=>{
            setUser(user.data);
          })
          .catch(err=>{
            console.log(`err:: ${err}`);
          })
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <div className='flex'>
        <VideoList />  
        <div className='p-4 text-4xl font-bold text-white mb-4'>
          {user ? (
            <h1> hello  
              <span className=' text-[#444972]'>
                {" " + user.username}
              </span>
            </h1>
          ) : (
            <h1>
            </h1>
          )}
        </div>
      </div>

    </>
  );
};


