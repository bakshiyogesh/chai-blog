import React from 'react';
import { Login as LoginComponent } from '../components';
function Login() {
  console.log('inside Login page');
  return (
    <div className='py-8'>
      <LoginComponent />
    </div>
  );
}

export default Login;
