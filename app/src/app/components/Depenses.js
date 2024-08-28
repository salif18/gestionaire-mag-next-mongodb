import React, { useContext } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const Depenses = ({depensesTotal}) => {

    return (
        <div className='depensesWidget'>
        <h1><MonetizationOnIcon className='icon'/>  Dépenses sur bénefice </h1>
        <p>{depensesTotal} Fcfa </p>
        </div>
    );
}

export default Depenses;
