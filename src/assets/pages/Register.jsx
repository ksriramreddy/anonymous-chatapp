import React, {useState} from 'react';
import { userAuth } from '../../utils/Usercontext';
import {Link} from 'react-router-dom'
function Register() {
  const [error,setError] = useState(false)
  const {handleUserResgistration} = userAuth()
  const [cred,setCred] = useState(
    {
      name:'',
      email:'',
      password1:'',
      password2:''
    }
  )
  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
        <form onSubmit={(e)=>{handleUserResgistration(e,cred,setError)}} >
        <div className='field--wrapper'>
            <label htmlFor='username'>User name</label>
            <input type='text' 
            placeholder='username'
            required
            value={cred.name}
            onChange={(e)=>setCred({...cred,name:e.target.value})}
            />
          </div>
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
            va2lue={cred.password1}
            onChange={(e)=>setCred({...cred,password1:e.target.value})}
            />
          </div>
          <div className='field--wrapper'>
            <label htmlFor='password'>Conform password</label>
            <input type='password' 
            placeholder='conform password'
            required
            value={cred.password2}
            onChange={(e)=>setCred({...cred,password2:e.target.value})}
            />
          </div>
          <div className='field--wrapper'>
            <button type='submit' className='btn btn-primary btn-main'>Register</button>
          </div>
        </form>
        <p>Already have an account? Register <Link to={'/login'}>here</Link></p>
      </div>
      
    </div>
  ); 
}

export default Register;
