"use client"

import { useContext, useEffect } from 'react';
import { MyStore } from './context/store';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token } = useContext(MyStore);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/');
      }
    }, [token, router]);
    return <WrappedComponent {...props} />;
  };
};

export default withAuth; 
