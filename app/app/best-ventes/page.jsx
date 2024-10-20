"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import withAuth from '../withAuth';



const BestVente = () => {
    const userId = Cookies.get("cookiesUserId");
    const token = Cookies.get("cookiesToken");
    const [bestVendu, setBestVendu] = useState([])
    //recuperer les meilleur vente
    useEffect(() => {
        const getBestVente = () => {
            axios.get(`${process.env.NEXT_PUBLIC_URI}/ventes/stats-by-categories/${userId}`,{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              })
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
    }, [userId, token]);

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
                    rowsPerPageOptions={[5, 10, 20]}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#376369;', // Changez cette couleur selon vos besoins
                            color: '#000000', // Pour changer la couleur du texte du header
                            textTransform: "uppercase",
                            fontWeight: 600,
                            fontSize:"1rem"
                        },
                    }}
                />
            </section>
        </main>
    );
}

export default withAuth(BestVente)
