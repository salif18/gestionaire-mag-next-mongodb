import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import SellIcon from '@mui/icons-material/Sell';
const Ventes = () => {
    const {venteTotal} = useContext(MyStore)
    return (
        <div className='ventsWidget'>
            <h1><SellIcon className='icon'/>  Prix de ventes globals</h1>
            <p>{venteTotal} Fcfa </p>
        </div>
    );
}

export default Ventes;
