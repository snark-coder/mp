import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const {logout} = useContext(AuthContext);
    const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from?.pathname || "/";
    const handleLogout  = () => {
        logout().then(()=> {
            alert("Log out successful!");
            navigate(from, {replace:true});
        }).catch((error)=> {

        })
    }
  return (
    <div className='h-screen bg-teal-100 flex item-center justify-center'>
        <h1>Are you sure you want to logout?</h1>
      <button className='bg-blue-700 px-8 py-2 text-white rounded' onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Logout
