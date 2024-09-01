"use client"
import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyStore } from '../../context/store';
import withAuth from '../../withAuth';

// export async function getServerSideProps(context) {
//     // Récupérer des données côté serveur ici
//     const res = await axios.get('/api/categories');
//     const categories = await res.results;
  
//     // Passer les données à la page via les props
//     return {
//       props: {
//         categories,
//       },
//     };
//   }
const CategoriesList = () => {
  const {token , userId } = useContext(MyStore)
    const [categories, setCategories] = useState([])
       
//   charger les depenses
  useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`/api/categories/${userId}`,{
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
    axios.delete(`/api/categories/single/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(err))
  };

 

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
           
              <span onClick={() => handledelete(params.row._id)}>
                <p style={{fontSize:16, fontFamily:"roboto",color:"rgb(21, 109, 150)", cursor:"pointer"}}>Supprimer</p>
              </span>
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
        <Link href="/pages/create_categorie">Créer votre categorie</Link>
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
              backgroundColor: '#376369;', // Changez cette couleur selon vos besoins
              color: '#000000', // Pour changer la couleur du texte du header
              textTransform:"uppercase",
              fontWeight:600
            },
          }}
        />
      </section>
    </section>
  </main>

  )
}

export default withAuth(CategoriesList)