"use client"

import { useContext, useEffect } from 'react';
import { MyStore } from './context/store';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    // const { token } = useContext(MyStore);
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");
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
