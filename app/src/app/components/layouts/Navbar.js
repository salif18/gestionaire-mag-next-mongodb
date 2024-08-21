import React from 'react';
import image from '../../../../public/images/logo.jpg'
import Image from 'next/image';
const Navbar = () => {
    return (
        <header className='header'>
          <div className='header-left'>
          <Image src={image} alt='' />
          <h1>GESTIONNAIRE </h1>
          </div>
           
        </header>
    );
}

export default Navbar;
