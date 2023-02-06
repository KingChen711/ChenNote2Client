import React from 'react';
import FolderList from './FolderList';
import NoteList from './NoteList';
import logo from '../assets/logo.jpg';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoteDetail from './NoteDetail';

type Props = {};

const Board = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  return (
    <div className="flex flex-col items-center justify-between pb-12 mx-auto h-screen">
      <img alt="" src={logo} className="mt-8  h-20 rounded-lg shadow-sm shadow-white" />
      <div className="flex justify-end items-center mb-2 w-10/12 pr-4">
        <div className="text-xl font-bold text-white">{user.name}</div>
        <img
          alt="avatar"
          className="w-9 h-9 rounded-full ml-2 mr-2"
          src={user.avatarUrl}
        />
        <IconButton
          onClick={() => {
            localStorage.clear();
            navigate('/auth');
          }}
        >
          <LogoutIcon
            style={{
              color: 'white',
              fontSize: '32px',
            }}
          />
        </IconButton>
      </div>
      <div className="w-10/12 flex-1 bg-white rounded-2xl overflow-hidden h-[600px] grid grid-cols-12 relative">
        <FolderList />
        <NoteList />
        <NoteDetail />
      </div>
    </div>
  );
};

export default Board;
