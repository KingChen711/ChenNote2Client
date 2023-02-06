import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/chenNote2API';
import { CircularProgress } from '@mui/material';

type Props = {};

interface IGoogleUser {
  email: string;
  name: string;
  picture: string;
}

const Auth = (props: Props) => {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [currentlyLogged, setCurrentlyLogged] = useState(false);

  async function handleLoginUser(googleToken: string | undefined) {
    setCurrentlyLogged(true);
    const userData: IGoogleUser = jwt_decode(googleToken as string);

    await loginUser({
      email: userData.email,
      name: userData.name,
      avatarUrl: userData.picture,
    })
      .then((res: any) => {
        localStorage.setItem('chen-note-2-token', res.data.accessToken);
      })
      .then(() => {
        setCurrentlyLogged(false);
        navigate('/');
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img alt="" src={logo} className="my-2 w-60 rounded-lg shadow-sm shadow-white" />
      {currentlyLogged ? (
        <div className="flex items-center text-4xl font-bold text-white">
          Đang đăng nhập <CircularProgress size="4rem" />
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const googleToken = credentialResponse.credential;
            handleLoginUser(googleToken);
          }}
          onError={() => {}}
        />
      )}
    </div>
  );
};

export default Auth;
