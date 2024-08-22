"use client"
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { MyStore } from '../../context/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Navbar from '../../components/layouts/Navbar';
import SideBar from '../../components/layouts/SideBar';
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
const ProductFilter = produits.length > 0 && produits.filter((item) => item.nom.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) || item.categories.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase() || item.stocks == searchValue))

//le slice par nombre
const [selection,setSelection] = useState(produits.length)
const options = [
  {values:produits.length,label:'Afficher tous'},
   {values:5,label:5},{values:10,label:10},{values:20,label:20},
   {values:25,label:25},{values:50,label:50},{values:80,label:80},{values:100,label:100},
  ]

  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "nom", headerName: "Name", width: 100 },
    { field: 'categories', headerName: 'Categories', width: 100 },
    { field: 'prixAchat', headerName: "Prix d'achat", width: 200 },
    { field: 'prixVente', headerName: "Prix de vente", width: 200 },
    { field: 'stocks', headerName: 'Stocks', width: 200 ,
      renderCell: (params) => {
        return (
            <section>
             {params.row.stocks <= 0 ? <span className='fini'>Ce stock est fini</span> : params.row.stocks}
            </section>
        )
    }

    },
    { field: "dateAchat", headerName: "Date d'achat", width: 200 },
    {
        field: 'actions', headerName: 'Actions', width: 200,
        renderCell: (params) => {
            return (
                <section>
                {params.row.stocks > 0 && <span onClick={()=>handleAjouter(params.row)}><ShoppingCartIcon className='ico' /></span>}
                <span onClick={()=>router.push(`/pages/produits/${params.row._id}`)}> <EditIcon className='edit' /> </span>
                {params.row.stocks <= 0 && 
                  <span onClick={()=>handledelete(params.row._id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </section>
            )
        }
    },

];

    return (
      <>
      <Navbar/>
      <main className='App'>
      <SideBar/>
        <section className='produits'>
            <div className='title-stock'>
            <div className='leftp'>
              <h3>Etat de stock</h3>
              <p> {numberStock} produits</p>
            </div>
            <button className='btn-add' onClick={()=>router.push('/pages/add-product')}>Ajouter <AddBusinessIcon style={{marginLeft:5}} /></button>
            </div>
            <div className='filter-search'>
             <select className='selection' value={selection} onChange={(e)=>setSelection(e.target.value)}>
               {options.map((item)=>(
                <option className='option' key={item.label} value={item.values}>{item.label}</option>))
                
              }
               
             </select>

             <input className='search-champs' type='text' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Rechercher un produit...' />
            </div>
            
            <section className='array-products'>
            <DataGrid
                    rows={!searchValue ? produits : ProductFilter}
                    getRowId={(row) => row._id}
                    disableSelectionOnclick
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
             
            </section>
        </section>
        </main>
        </>
    );
}

export default Produits;
