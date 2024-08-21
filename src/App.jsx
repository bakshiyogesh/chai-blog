// import './App.css'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const toastSuccess = (message) => toast.success(message, { position: 'top-right' });
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          toastSuccess('Login  successfully');
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        throw error;
      });
  }, []);
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header />
        <main className='h-full'>
          <Outlet />
        </main>
        <Toaster
          position='bottom-left'
          toastOptions={{
            duration: 3000,
            role: 'status',
            ariaLive: 'polite',
            style: {
              background: 'green',
              color: 'whitesmoke',
            },
          }}
        />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
