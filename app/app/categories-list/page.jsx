"use client"
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import withAuth from '../withAuth';


const CategoriesList = () => {
    const [categories, setCategories] = useState([])
    const userId = Cookies.get("cookiesUserId");
    const token = Cookies.get("cookiesToken");
    const [indexItem ,setIndexItem] = useState("")
    const [message ,setMessage] = useState('')
       
//   charger les depenses
  useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`${process.env.NEXT_PUBLIC_URI}/categories/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
     .then((res) =>{
      setCategories(res.data.results)
     }).catch(err => console.error(err))
    };
    getDepenses()
},[userId, token])



  //supprimer le produit
  const handledelete = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_URI}/categories/single/${id}`,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  })
      .then((res) => {
        setMessage(res.data.message);
        setIndexItem(id)
  })
      .catch((err) => console.error(err))
  };

  useEffect(() => {
    if (message) {
        const timer = setTimeout(() => {
            setMessage('');
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [message]);

  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    {
      field: "name", headerName: "Categorie name", width: 1000, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.name}</p>
          </section>
        )
      }
    },

    {
      field: 'actions', headerName: 'Actions', width: 100,
      renderCell: (params) => {
        return (
          <section className='action'>
           
           {indexItem !== params.row._id ? <span onClick={() => handledelete(params.row._id)}>
                <p style={{fontSize:16, fontFamily:"roboto",color:"rgb(21, 109, 150)", cursor:"pointer"}}>Supprimer</p>
              </span> : <span className='alert'>{message}</span>
           }
          </section>
        )
      }
    },

  ];
  return (
    <main className='categories'>
    <header className='header-categories'>
      <h1>Categories liste</h1>
    </header>
    <nav className='categorie-navbar'>
      <section className='link-create-categorie'>
        <Link href="/create_categorie">Créer votre categorie</Link>
      </section>
    </nav>

    <section className='categorie-container'>
  

      <section className='array-products'>
        <DataGrid
          rows={categories}
          getRowId={(row) => row._id}
          disableSelectionOnclick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgb(121, 177, 252);', // Changez cette couleur selon vos besoins
              color: '#222222', // Pour changer la couleur du texte du header
              textTransform:"uppercase",
              fontWeight:600,
              fontSize:"0.9em"
            },
          }}
        />
      </section>
    </section>
  </main>

  )
}

export default withAuth(CategoriesList)