"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';



const ListeVente = () => {
  const router = useRouter()
  const [message ,setMessage] = useState('')
  const [vendues , setVendues] = useState([])

  //charger les ventes
  useEffect(() => {
    const getVente =()=>{
    axios
      .get(`/api/ventes`)
      .then((response) => {
        setVendues(response.data.results);
      })
      .catch((err) => console.error(err));
    };
    getVente()
  }, []);

  //supprimer
const handledelete = (item)=>{
  axios.delete(`/api/ventes/${item._id}`)
  .then((res) => {
    setMessage(res.data.message)
    router.push('/pages/vendues') 
  })
  .catch((err)=>console.error(err));
  
}


  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    {
      field: "nom", headerName: "Name", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.nom}</p>
          </section>
        )
      }
    },
    {
      field: 'categories', headerName: 'Categories', width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.categories}</p>
          </section>
        )
      }
    },
  
    {
      field: 'prixVente', headerName: "Prix de vente", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.prixVente * params.row.qty}</p>
          </section>
        )
      }
    },
    {
      field: 'qty', headerName: 'Quantités', width: 200,
      renderCell: (params) => {
        return (
          <section className='title'>
            {params.row.stocks <= 0 ? <span className='stock-fini'>Ce stock est fini</span> : params.row.stocks}
          </section>
        )
      }

    },
    {
      field: "timestamps",
      headerName: "Date ",
      width: 200,
      renderCell: (params) => {
        const formattedDate = new Date(params.row.timestamps).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })
        return (
          <section className='title'>
            <p>{formattedDate}</p>
          </section>
        )
      }
    },
    {
      field: 'actions', headerName: 'Actions', width: 200,
      renderCell: (params) => {
        return (
          <section className='action'>
             <span className='cancel' onClick={()=>handledelete(params.row)}> <RotateLeftIcon style={{marginRight:10}}  />  Annuler </span>
          </section>
        )
      }
    },

  ];

message && setTimeout(()=>setMessage(''),2000)
//vue de frontend
    return (
        <main className='list'>
            <header className='header-list'>
              <h1>Les Produits vendus</h1>
            </header>
            <section className='products-content'>

             <DataGrid
          rows={vendues}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#376369;', // Changez cette couleur selon vos besoins
                color: '#000000', // Pour changer la couleur du texte du header
                textTransform:"uppercase",
                fontWeight:"bold"
              },
            }}
        />
            </section>
        </main>
    );
}

export default ListeVente;
