"use client"
import React, { useContext, useEffect, useState } from 'react'
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { MyStore } from '../../context/store';
import withAuth from '../../withAuth';
import Cookies from 'js-cookie';
const Fournisseurs = () => {
  // const { token, userId } = useContext(MyStore)
  const router = useRouter()
  const [fournisseurs, setFournisseurs] = useState([])
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");

  //charger les produits
  useEffect(() => {
    const getProduits = () => {
      axios
        .get(`/api/fournisseurs/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFournisseurs(response.data.fournisseurs);
        })
        .catch((err) => console.error(err));
    };
    getProduits()
  }, [userId, token]);

  //supprimer le produit
  const handledelete = (id) => {
    axios.delete(`/api/fournisseurs/single/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((err) => console.error(err))
  };



  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    {
      field: "prenom", headerName: "Prenom", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.prenom}</p>
          </section>
        )
      }
    },
    {
      field: 'nom', headerName: 'Nom', width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.nom}</p>
          </section>
        )
      }
    },
    {
      field: 'numero', headerName: "Téléphone", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.numero}</p>
          </section>
        )
      }
    },
    {
      field: 'address', headerName: "Address", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.address}</p>
          </section>
        )
      }
    },
    {
      field: 'produit', headerName: 'Produit', width: 200,
      renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.produit}</p>
          </section>
        )
      }

    },
    {
      field: 'actions', headerName: 'Action', width: 200,
      renderCell: (params) => {
        return (
          <section className='title'>
            <button className='btn-del' onClick={() => handledelete(params.row._id)} >supprimer</button>
          </section>
        )
      }

    },

  ];

  return (
    <main className='fournisseurs'>
      <section className='fournisseur-head'>
        <button className='btn-add' propovertarget="confirm" onClick={() => router.push('/pages/add-fournisseurs')}>Ajouter fournisseurs <CoPresentIcon style={{ marginLeft: 5 }} /></button>
      </section>


      <section className='fournisseurs-content'>
        <DataGrid
          rows={fournisseurs}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#376369;', // Changez cette couleur selon vos besoins
              color: '#000000', // Pour changer la couleur du texte du header
              textTransform: "uppercase",
              fontWeight: 600
            },
          }}
        />

      </section>
    </main>
  )
}

export default withAuth(Fournisseurs)