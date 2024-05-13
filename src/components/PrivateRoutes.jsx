import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { userAuth } from '../utils/Usercontext';
// import { userAuth } from '../utils/Usercontext';
function PrivateRoutes() {
    const {user} =userAuth()
  return (
    <>
      {
        user? <Outlet/> : <Navigate to={'/login'}/>
      }
    </>
  );
}

export default PrivateRoutes;
