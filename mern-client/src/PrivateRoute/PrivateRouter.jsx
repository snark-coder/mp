import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className='text-center'>Loading...</div>;
    }

    if(user){
        return children;
    }

  return (
    <Navigate to={"/login"} state={{from : location}} replace>

    </Navigate>
  )
}

export default PrivateRouter
