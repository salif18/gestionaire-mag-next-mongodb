import React from 'react';
import { DataGrid ,ResponsiveContainer} from '@mui/x-data-grid';

const Statstistiques = ({data, columns}) => {

    // Créer un format de date avec le nom du mois
  const dateFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });

  // Formater les données pour afficher le nom du mois
  const formattedData =data && data.length > 0 && data.map((row) => ({
    ...row,
    mois: dateFormatter.format(new Date(row.annee, row.mois - 1, 1)),
  }));
   
    return (
        <div className='statsWidget'>
            <h1>Etude detaillée</h1>
            <div style={{ height: 300, width: '100%' }}>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <DataGrid  columns={columns} pageSize={10} rows={formattedData} getRowId={(row) => row.annee + row.mois} />
            {/* </ResponsiveContainer> */}
          </div>
    
        </div>
    );
}

export default Statstistiques;
