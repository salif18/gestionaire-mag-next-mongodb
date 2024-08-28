"use client"
import { useRouter } from 'next/navigation';

import Navbar from './components/layouts/Navbar'
import SideBar from './components/layouts/SideBar'
import { useContext, useEffect } from 'react';
import { MyStore } from './context/store';
import Login from './pages/(auth)/login/page';

export default function BodyLayout({ children, interClassName }) {
    const router = useRouter();
    const { token } = useContext(MyStore)
    console.log(token)
    
  
  return (
    <body className={interClassName}>
    
      <Navbar />
      <section className="body">
        <SideBar />
        <section className="contents">
            {children}
        </section>
      </section>
    </body>
  );
}
