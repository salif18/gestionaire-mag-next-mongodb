import React from 'react';
import SellIcon from '@mui/icons-material/Sell';
const Ventes = ({venteTotal} ) => {
    
    return (
        <div className='ventsWidget'>
            <h1><SellIcon className='icon'/>  Ventes total</h1>
            <p>{venteTotal} Fcfa </p>
        </div>
    );
}

export default Ventes;
