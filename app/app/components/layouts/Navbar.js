"use client"
import React, { useContext, useState } from 'react';
import image from "/public/images/salespulse.jpg";
import Image from 'next/image';
import Cookies from 'js-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import { MyStore } from '@/app/context/store';

const Navbar = () => {
  const { toggleMenu } = useContext(MyStore)
  const entreprise = Cookies.get('entreprise');
 
  return (
    <header className='header'>
      <section className="header-left">
        <Image src={image} alt='' />
        <section className='column'>
          <h1>SalesPulse </h1>
          <p>Manager</p>
        </section>
        
      </section>
      <section className='username'>
        <p>{entreprise}</p>
      </section>
    </header>
  );
}

export default Navbar;
