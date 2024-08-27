import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function hancleBack() {
    navigate('/')
  }

  return (
    <nav className='h-12 bg-[#1c2431] m-2 p-2 rounded-md flex'>
         <Link to="/" className=' text-blue-600 text-lg'>Trainify </Link>
    </nav>
  )
}
