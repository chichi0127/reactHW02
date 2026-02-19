import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Login from './login.jsx'
import 'bootstrap'
import './assets/all.scss'
import axios from 'axios'

function Main() {
  const apiPath = "https://ec-course-api.hexschool.io/";
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {
    const checkLogin = async () => {

      const BPCookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      if (!BPCookie) {
        setIsAuth(false);
        return;
      }

      axios.defaults.headers.common['Authorization'] = BPCookie;

      try {
        const res = await axios.post(`${apiPath}v2/api/user/check`);
        console.log(res.data);
        setIsAuth(true);

      } catch (error) {
        setIsAuth(false);
      }

    }

    checkLogin();

  }, [])

  return (
    <>
      {isAuth ? <App /> : <Login />}
    </>
  )

}



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Main />

  </StrictMode>,
)
