import React from 'react';
import { Typography } from '@mui/material';
import { INote } from '../services/chenNote2API';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  note?: INote;
  status: string;
};

const statusText = {
  creating: 'Đang tạo note...',
  deleting: 'Đang xóa note...',
};

const PendingNote = ({ note, status }: Props) => {
  const statusValue = statusText[status as keyof typeof statusText];

  if (status === 'skeleton') {
    return (
      <div className="bg-white py-2 px-4 rounded-md mb-2">
        <Skeleton className="h-5" />
        <Skeleton className="h-3" />
      </div>
    );
  }

  return (
    <div className="bg-white py-2 px-4 rounded-md mb-2 cursor-pointer opacity-50">
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          lineClamp: 1,
          WebkitBoxOrient: 'vertical',
          fontWeight: 'bold',
          fontSize: {
            md: '16px',
            lg: '18px',
            xl: '20px',
          },
        }}
        className="font-bold"
      >
        {note?.title}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            md: '10px',
            lg: '12px',
            xl: '14px',
          },
        }}
      >
        {new Date(note?.createdAt || "").toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        })}
      </Typography>
      <div className="font-bold">{statusValue}</div>
    </div>
  );
};

export default PendingNote;
