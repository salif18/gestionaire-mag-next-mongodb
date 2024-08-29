"use client"

import Navbar from './components/layouts/Navbar'
import SideBar from './components/layouts/SideBar'
import { useContext} from 'react';
import { MyStore } from './context/store';
import Login from './pages/(auth)/login/page';

export default function BodyLayout({ children, interClassName }) {

    const { token } = useContext(MyStore)
  
  return (
    <body className={interClassName}>
    {token ?
      (<>
      <Navbar />
      <section className="body">
        <SideBar />
        <section className="contents">
            {children}
        </section>
      </section>
    </>
   ):(<Login/>) }
    </body>
  );
}
