import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Tendance = () => {
    const {bestVendu} = useContext(MyStore)
    return (
        <div className='tendance'>
            <AutoAwesomeIcon className='icon'/><h1>Meilleur vente</h1>
            <div className='ssss'>
            {bestVendu && bestVendu.length > 0 &&
                bestVendu.slice(0,3).map((item) => (
                    <div className='tendance-cont' key={item._id}>
                      <p>{item.nom}<ArrowUpwardIcon style={{color:'rgb(29, 245, 0)'}}/></p><span>{item.total_vendu}</span>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default Tendance;
