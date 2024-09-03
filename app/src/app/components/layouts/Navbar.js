import React, { useContext } from 'react';
import image from '../../../../public/images/logo.jpg'
import Image from 'next/image';
import Cookies from 'js-cookie';

const Navbar = () => {
  const userName = Cookies.get('userName');

  return (
    <header className='header'>
      <section className='header-left'>
        <Image src={image} alt='' />
        <h1>VENTE-MANAGER </h1>
      </section>
      <section className='username'>
        <p>{userName}</p>
      </section>
    </header>
  );
}

export default Navbar;
