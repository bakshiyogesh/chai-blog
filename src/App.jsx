// import './App.css'

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import conf from './conf/config';
function App() {
  const appwriteURL = conf.appwriteURL;
  console.log(appwriteURL, 'appwriteURL');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
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
      {/* <p>Appwrite blogs</p> */}
      <div className='w-full block'>
        <Header />
        <main>
          TODO:
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
