"use client"
import Navbar from './components/layouts/Navbar'
import SideBar from './components/layouts/SideBar'
import { useContext } from 'react';
import { MyStore } from './context/store';

export default function BodyLayout({ children, interClassName }) {
  const { token } = useContext(MyStore)

  return (
    <main className={interClassName}>
      <Navbar />
      <section className="body">
        {token && <SideBar />}
        <section className="contents">
          {children}
        </section>
      </section>
    </main>
  );
}
