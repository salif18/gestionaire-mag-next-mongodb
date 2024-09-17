"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
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
