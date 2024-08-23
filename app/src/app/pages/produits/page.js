"use client"
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { MyStore } from '../../context/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useRouter } from 'next/navigation'
import { DataGrid } from '@mui/x-data-grid';


const Produits = () => {
  const [produits, setProduits] = useState([])
  const router = useRouter()
  const {handleAddPanier} = useContext(MyStore)

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

  //caclule le nombre total de stocks
const calculeStock = ()=>{
 const numberStock = produits.length > 0 && produits.map((item) => (item?.stocks))
 const resultat =numberStock && numberStock.reduce((a,b) => a + b,0)
 return resultat
}
const numberStock = calculeStock()

//ajouter produit dans le panier de vente
const handleAjouter =(item)=>{
   handleAddPanier(item)
  router.push('/pages/panier')
   
}

//supprimer le produit
const handledelete = (id)=>{
  axios.delete(`/api/produits/${id}`)
  .then((res) => res.data)
  .catch((err)=>console.error(err))
}

//la valeur de recherche
const [searchValue,setSearchValue] = useState('')

const ProductFilter = produits.length > 0 && produits.filter((item) => 
  item.nom.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) || 
  item.nom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
  item.categories.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) ||
  item.categories.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
  item.prixVente == parseInt(searchValue)||
  item.stocks == parseInt(searchValue)
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
    { 
      field: "dateAchat", 
      headerName: "Date d'achat", 
      width: 200,
      renderCell: (params) => {
          const formattedDate = new Date(params.row.dateAchat).toISOString().split('T')[0];
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
                {params.row.stocks > 0 && <span onClick={()=>handleAjouter(params.row)}><ShoppingCartIcon className='icon-add' /></span>}
                <span onClick={()=>router.push(`/pages/produits/${params.row._id}`)}> <EditIcon className='icon-edit' /> </span>
                {params.row.stocks <= 0 && 
                  <span onClick={()=>handledelete(params.row._id.nom)}>
                    <DeleteIcon className='icon-del' /> 
                  </span>
                 }
                </section>
            )
        }
    },

];

    return (
      
        <main className='produits'>
            <section className='title-stock'>
            <section className='left'>
              <h3>Etat de stock</h3>
              <p> {numberStock} produits</p>
            </section>
            <button className='btn-add' onClick={()=>router.push('/pages/add-product')}>Ajouter <AddBusinessIcon style={{marginLeft:5}} /></button>
            </section>
            <section className='search'>
             <input className='search-champs' type='text' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Rechercher un produit...' />
            </section>

            <section className='products-content'>
            <DataGrid
                    rows={!searchValue ? produits : ProductFilter}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                  
                />
             
            </section>
        </main>
    );
}

export default Produits;
