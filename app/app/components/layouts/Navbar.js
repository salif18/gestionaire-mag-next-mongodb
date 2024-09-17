import React from 'react';
import image from "/public/images/salespule.jpg";
import Image from 'next/image';
import Cookies from 'js-cookie';

const Navbar = () => {
  const entreprise = Cookies.get('entreprise');

  return (
    <header className='header'>
      <section className='header-left'>
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
