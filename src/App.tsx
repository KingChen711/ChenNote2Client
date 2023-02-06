import React from 'react';
import Board from './components/Board';
import Auth from './components/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { useMediaQuery } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Props = {};

const App = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width:1080px)');

  if (!isDesktop) {
    return (
      <div className="text-white text-center text-4xl font-bold p-12">
        Rất tiếc, hiện tại ChenNote 2 chỉ hỗ trợ trên PC
      </div>
    );
  }

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as any}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Board />} />
          </Route>
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
