import React from 'react';
import { Typography } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  folder?: {
    name: string;
  };
  status: string;
};

const statusText = {
  creating: 'Đang tạo folder...',
  deleting: 'Đang xóa folder...',
};

const PendingFolder = ({ folder, status }: Props) => {
  const statusValue = statusText[status as keyof typeof statusText];

  if (status === 'skeleton') {
    return (
      <div className="bg-white py-2 px-4 rounded-md mb-2">
        <Skeleton className="h-6" />
      </div>
    );
  }

  return (
    <div className="bg-white font-bold py-2 px-4 rounded-md mb-2 opacity-50">
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
      >
        {folder?.name}
      </Typography>
      <div>{statusValue}</div>
    </div>
  );
};

export default PendingFolder;
