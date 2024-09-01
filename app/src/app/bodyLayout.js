"use client";

import Navbar from './components/layouts/Navbar';
import SideBar from './components/layouts/SideBar';
// import { useContext, useState, useEffect } from 'react';
// import { MyStore } from './context/store';
import withAuth from './withAuth';

const BodyLayout=({ children, interClassName }) =>{
  // const { token } = useContext(MyStore);
  // const [showSideBar, setShowSideBar] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     setShowSideBar(true);
  //   }
  // }, [token]);

  return (
    <section className={interClassName}>
      <Navbar />
      <section className="body">
      <SideBar />
        <section className="contents">
          {children}
        </section>
      </section>
    </section>
  );
}

export default withAuth(BodyLayout)
