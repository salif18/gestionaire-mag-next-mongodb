import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Achats = ({resultat}) => {
   
    return (
        <div className='achatsWidget'>
            <h1><AttachMoneyIcon className='icon'/>  Prix d'achats </h1>
            <p>{resultat} Fcfa</p>
        </div>
    );
}

export default Achats;
