"use client"
// HOC/withAuth.js
import { Suspense, useContext, useEffect } from 'react';

import { MyStore } from './context/store';
import { useRouter } from 'next/navigation';
import Loading from './loading';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { token } = useContext(MyStore);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/');
      }
    }, [token, router]);

    // if (!token) {
    //   return <Suspense fallback={<Loading/>}>
    //      <p>Loading...</p>
    //   </Suspense>;
    // }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth; 
