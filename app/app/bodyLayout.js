"use client";

import Navbar from './components/layouts/Navbar';
import SideBar from './components/layouts/SideBar';
import withAuth from './withAuth';

const BodyLayout=({ children, interClassName }) =>{
  
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
