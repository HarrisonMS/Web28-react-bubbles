import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const history = useHistory();
  
  const [ creds, setCreds ] = useState({
    username: '',
    password: ''
  })
  console.log(creds)

  const handleChange = e => {
    e.preventDefault();
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    const endpoint = '/api/login';

  axiosWithAuth()
    .post(endpoint, creds)
    .then(response => {
      const token = JSON.stringify(response.data.payload);
      localStorage.setItem('token', token);
      history.push('/bubbles');
    })
    .catch(error => console.log('can not seem to login buddy', error));
      setCreds({
        username: '',
        password: ''
      })
  }
  return (
    <>
<div className='form-container'>
      <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
        type='text' 
        name='username' 
        value={creds.username} 
        onChange={handleChange} />
      </label>
      <label>
        Password:
        <input 
        type='password' 
        name='password' 
        value={creds.password} 
        onChange={handleChange} />
      </label>
        <button 
          type="submit" >
          Login!
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
