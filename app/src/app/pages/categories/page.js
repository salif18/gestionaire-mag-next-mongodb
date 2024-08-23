"use client"
import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/store';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';

const Categories = () => {
    const {handleAddPanier} = useContext(MyStore)
    const router = useRouter()
    //etat initiale de la valeur de categorie a filtrer
    const [produits, setProduits] = useState([])
    const [categories ,setCategories ] = useState('')

    //charger les produits
 useEffect(() => {
   const getProduits =()=>{
   axios
     .get(`/api/produits`)
     .then((response) => {
       setProduits(response.data.produits);
     })
     .catch((err) => console.error(err));
   };
   getProduits()
 }, []);

    
    // les bouton de categories
    const handleAjouter =(item)=>{
        handleAddPanier(item)
        router.push('/pages/ventes')
        
     }
     
     
//supprimer le produit
const handledelete = (id)=>{
   axios.delete(`/api/produits/${id}`)
   .then((res) => res.data)
   .catch((err)=>console.error(err))
 };

     const parfum =()=>{
        setCategories('Parfum')
     }

     const deodaurant =()=>{
        setCategories('Deodorant')
     }

     const pommade =()=>{
        setCategories('Pommade')
     }

     const lait = ()=>{
        setCategories('Lait')
     }

     const lotion =()=>{
        setCategories('Lotion')
     }

     const tube =()=>{
        setCategories('Tube')
     }

     

     const autres =()=>{
      setCategories('Autres')
     }

     const savon =()=>{
      setCategories('Savon')
     }

     const ProductFilter = produits.length > 0 && produits.filter((item) => 
      item.categories.toLocaleLowerCase().includes(categories.toLocaleLowerCase())
     
    );
    

  
  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    { field: "nom", headerName: "Name", width: 100 ,renderCell:(params)=>{
      return (
        <section className='title'>
          <p>{params.row.nom}</p>
        </section>
      )
    }},
    { field: 'categories', headerName: 'Categories', width: 100 ,renderCell:(params)=>{
      return (
        <section className='title'>
          <p>{params.row.categories}</p>
        </section>
      )
    }},
    { field: 'prixAchat', headerName: "Prix d'achat", width: 200 ,renderCell:(params)=>{
      return (
        <section className='title'>
          <p>{params.row.prixAchat}</p>
        </section>
      )
    }},
    { field: 'prixVente',headerName: "Prix de vente", width: 200 ,renderCell:(params)=>{
      return (
        <section className='title'>
          <p>{params.row.prixVente}</p>
        </section>
      )
    } },
    { field: 'stocks', headerName: 'Stocks', width: 200 ,
      renderCell: (params) => {
        return (
            <section className='title'>
             {params.row.stocks <= 0 ? <span className='stock-fini'>Ce stock est fini</span> : params.row.stocks}
            </section>
        )
    }

    },
    { field: "dateAchat", headerName: "Date d'achat", width: 200 ,renderCell:(params)=>{
      return (
        <section className='title'>
          <p>{params.row.dateAchat}</p>
        </section>
      )
    } },
    {
        field: 'actions', headerName: 'Actions', width: 200,
        renderCell: (params) => {
            return (
                <section className='action'>
                {params.row.stocks > 0 && <span onClick={()=>handleAjouter(params.row)}><ShoppingCartIcon className='icon-add' /></span>}
                <span onClick={()=>router.push(`/pages/produits/${params.row._id}`)}> <EditIcon className='icon-edit' /> </span>
                {params.row.stocks <= 0 && 
                  <span onClick={()=>handledelete(params.row._id)}>
                    <DeleteIcon className='icon-del' /> 
                  </span>
                 }
                </section>
            )
        }
    },

];

     //vue de frontend
    return (

        <main className='categories'>
            <header className='header-categories'>
              <h1>Categories</h1>
            </header>
            <nav className='categorie-navbar'>
            <button className='btn-cate' onClick={()=>parfum()}>Parfum</button>
            <button className='btn-cate' onClick={()=>deodaurant()}>Deodaurant</button>
            <button className='btn-cate' onClick={()=>pommade()}>Pommade</button>
            <button className='btn-cate' onClick={()=>lait()}>Lait</button>
            <button className='btn-cate' onClick={()=>lotion()}>Lotion</button>
            <button className='btn-cate' onClick={()=>tube()}>Tube</button> 
            <button className='btn-cate' onClick={()=>autres()}>Autres</button>
            <button className='btn-cate' onClick={()=>savon()}>Savon</button>
            </nav>

            <section className='categorie-container'>
               <h1>Choisir une catégorie de produits</h1>
                
                <section className='array-products'>
                <DataGrid
                    rows={ ProductFilter}
                    getRowId={(row) => row._id.nom}
                    disableSelectionOnclick
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}

                />
            </section>
            </section>
        </main>
        
    );
}

export default Categories;
