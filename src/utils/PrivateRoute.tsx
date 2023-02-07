import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, CircularProgress, Typography } from '@mui/material'
import { setUser } from '../features/userSlice'
import { useGetUserBasicQuery } from '../services/chenNote2API'

const PrivateRoute: React.FunctionComponent = () => {
  const token = localStorage.getItem('chen-note-2-token')
  const dispatch = useDispatch()
  const { data, isError, isLoading } = useGetUserBasicQuery(undefined)

  useEffect(() => {
    const getUserData: () => void = () => {
      dispatch(
        setUser({
          id: data?._id,
          email: data?.email,
          name: data?.name,
          avatarUrl: data?.avatarUrl
        })
      )
    }
    getUserData()
  }, [data])

  // execute when have token but error when get auth user
  if (token !== null && isError) {
    return (
      <Box display="flex " justifyContent="center">
        <Typography variant="h2" className="text-center text-white">
          Interval server error or network error
        </Typography>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box display="flex " justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  if (token !== null && token !== 'undefined') {
    return <Outlet />
  }

  return <Navigate to="/auth" />
}

export default PrivateRoute
