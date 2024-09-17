"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { MyStore } from '../../context/store';
import withAuth from '../../withAuth';
import Cookies from 'js-cookie';



const ListeVente = () => {
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");
  const router = useRouter()
  const [message ,setMessage] = useState('')
  const [vendues , setVendues] = useState([])
  const [indexItem ,setIndexItem] = useState("")

  //charger les ventes
  useEffect(() => {
    const getVente =()=>{
    axios
      .get(`/api/ventes/${userId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setVendues(response.data.results);
      })
      .catch((err) => console.error(err));
    };
    getVente()
  }, [userId, token]);

  //supprimer
const handledelete = (id)=>{
  axios.delete(`/api/ventes/single/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((res) => {
    setMessage(res.data.message)
    setIndexItem(id)
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
      field: 'prix_vente', headerName: "Prix de vente", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.prix_vente * params.row.qty}</p>
          </section>
        )
      }
    },
    {
      field: 'qty', headerName: 'Quantités', width: 200,
      renderCell: (params) => {
        return (
          <section className='title'>
             <p>{params.row.qty}</p>
          </section>
        )
      }

    },
    {
      field: "date_vente",
      headerName: "Date ",
      width: 200,
      renderCell: (params) => {
        const formattedDate = new Date(params.row.date_vente).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })
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
            {indexItem !== params.row._id ?  <span className='cancel' onClick={()=>handledelete(params.row._id)}> <RotateLeftIcon style={{marginRight:10}}  />  Annuler </span> : <span className='alert'>{message}</span> }
          </section>
        )
      }
    },

  ];

useEffect(() => {
  if (message) {
      const timer = setTimeout(() => {
          setMessage('');
      }, 1000);
      return () => clearTimeout(timer);
  }
}, [message]);
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

export default withAuth(ListeVente)
