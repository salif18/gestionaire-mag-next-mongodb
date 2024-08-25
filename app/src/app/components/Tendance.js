import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GroupsIcon from '@mui/icons-material/Groups';
const Tendance = () => {
    const {bestVendu} = useContext(MyStore)
    return (
        <div className='tendanceWidget'>
            <AutoAwesomeIcon className='icon'/><h1>Meilleur vente</h1>
            <section className='content'>
            {bestVendu && bestVendu.length > 0 &&
                bestVendu.slice(0,5).map((item) => (
                    <section className='tendance-info' key={item._id}>
                    <section style={{width:80}}>
                    <p>{item._id.nom}</p>
                    </section>
                      <p>plus de</p>
                      <span>{item.total_vendu}</span>
                      <GroupsIcon  style={{color:'red', margin:5}}/>
                      <ArrowUpwardIcon style={{color:'rgb(29, 245, 0)',margin:5}}/>
                    </section>
                ))
            }
            </section>
        </div>
    );
}

export default Tendance;
