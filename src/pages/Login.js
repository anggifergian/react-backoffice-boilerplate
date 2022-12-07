import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/appReducer';

import { globalStyles } from '../utils/style';

const Login = ({ className }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = event => {
    const { name, value } = event.target;

    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const handleSubmit = () => {
    dispatch(login({ status: true }));
  }

  return (
    <section className={className}>
      <div className='p-4'>
        <div className='form-group'>
          <input
            autoComplete='off'
            name='email'
            placeholder='Email'
            type='email'
            value={state.email}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <input
            name='password'
            placeholder='Password'
            type='password'
            value={state.password}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <button onClick={handleSubmit}>
          Login
        </button>
      </div>
    </section>
  )
}

export default styled(Login)`
  margin: 100px auto;
  max-width: 480px;

  .form-group {
    margin-bottom: 1rem;
  }

  .form-control {
    font-size: 1rem;
    padding: 10px;
    border: 2px solid ${globalStyles.palette.input};
    border-radius: 4px;
    width: 100%; 
  }
`