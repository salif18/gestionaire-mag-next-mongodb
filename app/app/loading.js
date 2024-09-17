import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
  return (
    <main className='loading'>
     <Skeleton animation="wave" />
     <p>loading....</p>
     
    </main>
  )
}