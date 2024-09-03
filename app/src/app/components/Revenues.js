import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Revenues = ({depensesTotal ,benefice}) => {
    
    const result = benefice - depensesTotal
    return (
        <section className='revenusWidget'>
        <h1><TrendingDownIcon style={{color:result <= 0 ? 'red':''}} className='icon'/> Etat de caisse</h1>
        <section className='r'><p>{result} Fcfa</p> {result <= 0 ?<ArrowDownwardIcon style={{color:'red'}}/> :<ArrowUpwardIcon style={{color:'green'}} />}</section>
    </section>
    );
}

export default Revenues;
