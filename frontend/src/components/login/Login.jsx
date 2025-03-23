import React from 'react'
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCss.css'
import UserLoginContext from '../../../contexts/UserLoginContext';

function Login() {
  let {user, loginUser, userLoginStatus, passStatus} = useContext(UserLoginContext);
  let navigate= useNavigate();
  function handleFormSubmit(data){
    loginUser(data)
  }

  useEffect(() => {
    if (userLoginStatus === true) {
      navigate("/user-profile");
    }
  }, [userLoginStatus]);

  let {register, handleSubmit, formState:{errors}} = useForm();
  return (
    <div style={{paddingTop:"30px"}}>
      <p className='display-6 text-center'>User Login</p>
      {/*<p className='text-center text-danger'>{err}</p>*/}
      <div className='row'>

      <div className='bg-light p-5 col-lg-5  col-mb-5 col-sm-5 mx-auto form-group'>
        <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='mb-2'>
            <label htmlFor="username" className='form-label'>Username</label>
            <input type="text" className='form-control' {...register('username', {required:true})}/>
            {errors.username?.type === 'required' && <p className='formSubmitErrors'>Username required</p>}
          </div>

          <div className='mb-2'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" className='form-control' {...register('password', {required:true})}/>
            {errors.password?.type === 'required' && <p className='formSubmitErrors'>Password required</p>}
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
      
    </div>
    </div>
  )
}

export default Login