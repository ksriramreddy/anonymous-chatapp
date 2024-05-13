import React, { useEffect, useState } from 'react';
import { userAuth } from '../../utils/Usercontext';
import { useNavigate,Link } from 'react-router-dom';
function Login() {
  const {user,handleUserLogin} =  userAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })
  const [cred,setCred] = useState(
    {
      email:'',
      password:''
    }
  )
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e)=>{handleUserLogin(e,cred)}} >
          <div className='field--wrapper'>
            <label htmlFor='email'>Email</label>
            <input type='email' 
            placeholder='email'
            required
            value={cred.email}
            onChange={(e)=>setCred({...cred,email:e.target.value})}
            />
          </div>
          <div className='field--wrapper'>
            <label htmlFor='password'>Password</label>
            <input type='password' 
            placeholder='password'
            required
            value={cred.password}
            onChange={(e)=>setCred({...cred,password:e.target.value})}
            />
          </div>
          <div className='field--wrapper'>
            <button type='submit' className='btn btn-primary'>Login</button>
          </div>
        </form><p>Dont have an account? Register <Link to={'/register'}>here</Link></p>
      </div>
      
    </div>
  );
}

export default Login;
