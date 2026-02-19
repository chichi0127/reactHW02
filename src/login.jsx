import axios from 'axios';
import BP from './assets/bp.jpg'
import { useEffect, useState } from 'react';


const apiPath = "https://ec-course-api.hexschool.io/";


export default function Login({ setIsAuth }) {

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [signInUser, setSignInUser] = useState({
        username: '',
        password: ''
    });
    const [token, setToken] = useState("");

    // const handlePass = (e) => {
    //     console.log(e.target.value);
    //     setPassword(e.target.value);

    // }

    // const handleUser = (e) => {
    //     setUsername(e.target.value);

    // }

    const handleUser = (e) => {
        const { name, value } = e.target;

        setSignInUser(prev => (
            {
                ...prev,
                [name]: value
            }));

    }

    const signIn = async () => {
        try {
            const res = await axios.post(`${apiPath}v2/admin/signin`, signInUser);
            const { token, expired } = res.data;
            setToken(token);
            document.cookie = `token=${token}; expires=${new Date(expired)}; path=/`;
            axios.defaults.headers.common['Authorization'] = token;
            setIsAuth(true);

        } catch (error) {
            console.log(error.response.data.message);
            setIsAuth(false);
        }
    }



    return (
        <>
            <div className="background d-flex align-items-center justify-content-center">
                <div className="login_style">
                    <h1 className='pt-5 text-center text-light fs-1 fw-bold'>登入</h1>
                    <div className='maininput mt-3 mb-3'>
                        <label htmlFor="mail" className='form-label text-light fs-5'>請輸入帳號</label>
                        <input type="email" name="username" value={signInUser.username} id='mail' className='form-control' onChange={handleUser} placeholder='請輸入信箱' />
                        <label htmlFor="password" className='pt-3 form-label text-light fs-5'>請輸入密碼</label>
                        <input type="password" name="password" value={signInUser.password} id='password' className='form-control' onChange={handleUser} placeholder='請輸入密碼' />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-primary text-center fw-bold px-4 fs-6 mt-4' onClick={signIn}>送出</button>
                    </div>
                </div>
            </div>
        </>
    )

}