import React, { useContext } from 'react';
import image from '../../../../public/images/logo.jpg'
import Image from 'next/image';
import Cookies from 'js-cookie';

const Navbar = () => {
  const entreprise = Cookies.get('entreprise');

  return (
    <header className='header'>
      <section className='header-left'>
        <Image src={image} alt='' />
        <h1>VENTE-MANAGER </h1>
      </section>
      <section className='username'>
        <p>{entreprise}</p>
      </section>
    </header>
  );
}

export default Navbar;
