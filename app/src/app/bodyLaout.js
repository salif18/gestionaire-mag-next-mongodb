"use client"
import Navbar from './components/layouts/Navbar'
import SideBar from './components/layouts/SideBar'
import { useContext } from 'react';
import { MyStore } from './context/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BodyLayout({ children, interClassName }) {
  const router = useRouter()
  const { token } = useContext(MyStore)

  useEffect(() => {
    if (!token) {
      router.replace("/pages/login")
    }
  }, [token, router])

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
