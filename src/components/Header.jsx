import React from 'react';
import {LogOut} from 'react-feather'
import { userAuth } from '../utils/Usercontext';
function Header() {
    const {user,handleUserLogout} = userAuth()
    console.log(user);
  return (
    <div id='header--wrapper'>
      {
        user? (
            <>
            {user.name}
            <LogOut
            onClick={handleUserLogout} 
            className='header--link'/>
            </>) : (<button
            
            >Login</button>
        )
      }
    </div>
  );
}

export default Header;
