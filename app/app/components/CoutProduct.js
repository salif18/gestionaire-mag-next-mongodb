import React, { useContext } from 'react';


import EuroIcon from '@mui/icons-material/Euro';
import { MyStore } from '../context/store';

const CoutProduct = () => {
    const {venteTotal,beneficeGeneral} = useContext(MyStore)
    return (
        <div className='coutprodWidget'>
        <h1><EuroIcon className='icon'/> Prix d'achats des ventes</h1>
        <p>{venteTotal-beneficeGeneral} Fcfa </p>
        </div>
    );
}

export default CoutProduct;
