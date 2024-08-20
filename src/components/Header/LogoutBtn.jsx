import React from 'react';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logoutUser().then(() => dispatch(logout()));
  };
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
      Logout
    </button>
  );
}
export default Logout;
