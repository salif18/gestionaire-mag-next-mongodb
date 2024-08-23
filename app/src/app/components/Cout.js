import React, { useContext } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';

const Cout = ({benefice}) => {
   
    return (
        <div className='coutWidget'>
            <h1><PaymentsIcon className='icon'/> Bénefices global</h1>
            <p>{benefice} Fcfa</p>
        </div>
    );
}

export default Cout;
