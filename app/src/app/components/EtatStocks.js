import React from 'react';

import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

const EtatStocks = ({produits}) => {
   
    const filterStock =produits && produits.length > 0 && produits.filter((item) => item.stocks === 0)
    return (
        <div className='stocksWidget'>
        <CallMissedOutgoingIcon className='icon'/><h1>Stocks en insuffisance</h1>
        {filterStock.length <=0 && <p>Aucuns</p>}
        <div className='content'>
        {filterStock &&
            filterStock.slice(0,5).map((item) => (
                <div className='stocks-container'>
                  <p className='nom'>{item.nom}</p>
                  <p className='categorie'>{item.categories}</p>
                </div>
            ))
        }
        </div>
        </div>
    );
}

export default EtatStocks;
