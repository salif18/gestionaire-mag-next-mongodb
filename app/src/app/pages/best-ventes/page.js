"use client"
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const BestVente = () => {

    const [bestVendu ,setBestVendu] = useState([])
    //recuperer les meilleur vente
    useEffect(() => {
      const getBestVente = () => {
          axios.get(`/api/ventes/stats-by-categories`)
              .then((res) => {
                  const data = res.data.results.map(item => ({
                      _id: item._id.nom,
                      nom: item._id.nom,
                      categories: item._id.categories,
                      total_vendu: item.total_vendu
                  }));
                  setBestVendu(data);
              }).catch((err) => console.error(err));
      };
      getBestVente();
  }, []);

  console.log(bestVendu)
 
  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    { field: "nom", headerName: "Nom", width: 100 },
    { field: 'categories', headerName: 'Categories', width: 100 },
    { field: "total_vendu", headerName: "Total vendu", width: 200 },

];
 
    return (
    
      
        <main className='bestvente'>
        <header className='header-best'>
        <h1>TENDANCE DU MARCHE</h1>
      </header>
      <section className='best-container'>
      <h1>Produits les plus achetes</h1>

       <DataGrid
                    rows={bestVendu}
                    getRowId={(row) => row._id}
                    disableSelectionOnclick
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5,10,20]}
                    
                /> 
      </section>
        </main>
    );
}

export default BestVente;
