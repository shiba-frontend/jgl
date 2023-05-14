import React, { useEffect } from 'react'
import { useNavigate, NavLink } from "react-router-dom";

const FlashScreen = () => {

    let navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => navigate("/sign-up", { replace: true }), 5000);
        return () => clearTimeout(timer);
      }, []);

     

  return (
    <div className='flash-bg'>
        <div className='flas-logo'>
            <img src='images/flash-logo.png'/>
        </div>
    </div>
  )
}

export default FlashScreen