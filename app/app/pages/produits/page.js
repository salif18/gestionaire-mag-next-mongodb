"use client"
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { MyStore } from '@/context/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Navbar from '@/components/layouts/Navbar';
import SideBar from '@/components/layouts/SideBar';
import { useRouter } from 'next/navigation'



const Produits = () => {
  const [produits, setProduits] = useState([])
  const router = useRouter()
  const {handleAddPanier} = useContext(MyStore)

//charger les produits
useEffect(() => {
  const getProduits =()=>{
    axios.get(`/api/produits`)
    .then((res) => {
      setProduits(res.data.produits);
    })
    .catch((err) => console.error(err));
  };
  getProduits()
}, []);
console.log(produits)

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
const ProductFilter = produits.length > 0 && produits.filter((item) => item.nom.includes(searchValue) || item.categories.includes(searchValue) || item.stocks == searchValue)

//le slice par nombre
const [selection,setSelection] = useState(produits.length)
const options = [
  {values:produits.length,label:'Afficher tous'},
   {values:5,label:5},{values:10,label:10},{values:20,label:20},
   {values:25,label:25},{values:50,label:50},{values:80,label:80},{values:100,label:100},
  ]
// const numerotation =(produits)=>{
//     const produitAvecNumero = produits.length > 0 && produits.map((item ,index)=>{
//       const numerLine = index +1;
//       return `${numerLine}.${item}`
//     })
//     return produitAvecNumero
// }

// const produitAvecNumero = numerotation(produits)
// console.log(produitAvecNumero)

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
            
            <div className='array-products'>
              <table className='table'>
               <thead className='table-header'>
               <tr className='ligne'>
               
                 <th  className='colonne'>NOMS</th>
                 <th className='colonne'>CATEGORIES</th>
                 <th className='colonne'>PRIX D'ACHATS</th>
                 <th className='colonne'>PRIX DE VENTE</th>
                 <th className='colonne'>STOCKS</th>
                 <th className='colonne'>DATE</th>
                 <th className='colonne'>ACTIONS</th>
               </tr>
               </thead>
               {/*afficher cette partie si la valeur de recheche est existe */}
              {searchValue && 
                ProductFilter.map((item)=>(
                  <tbody className='table-body' key={item.id} >
               <tr className='ligne-body' >
              
                <th className='colon'>{item.nom}</th>
                <th className='colon'>{item.categories}</th>
                <th className='colon'>{item.prixAchat} FCFA</th>
                <th className='colon'>{item.prixVente} FCFA</th>
                <th className='colon'>{item.stocks <= 0 ? <span className='fini'>Ce stock est fini</span> : item.stocks}</th>
                <th className='colon'>{item.dateAchat}</th>
                <th className='colon'>
                {item.stocks > 0 && <span onClick={()=>handleAjouter(item)}><ShoppingCartIcon className='ico' /></span>}
                <span onClick={()=>router.push(`/pages/produits/${item.id}`)}> <EditIcon className='edit' /> </span>
                {item.stocks <= 0 && 
                  <span onClick={()=>handledelete(item.id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </th>
               </tr>
              </tbody>))}
              {/*afficher cette partie si la valeur de recheche est nul et lavaleur de selection est existe */}
              {!searchValue && 
                produits.slice(0,selection).map((item)=>(
                  <tbody className='table-body' key={item.id}>
               <tr className='ligne-body' >
               
                <th className='colon'>{item.nom}</th>
                <th className='colon'>{item.categories}</th>
                <th className='colon'>{item.prixAchat} FCFA</th>
                <th className='colon'>{item.prixVente} FCFA</th>
                <th className='colon'>{item.stocks <= 0 ? <span className='fini'>Ce stock est fini</span> : item.stocks}</th>
                <th className='colon'>{item.dateAchat}</th>
                <th className='colon'>
                {item.stocks > 0 && <span onClick={()=>handleAjouter(item)}><ShoppingCartIcon className='ico' /></span>}
                <span onClick={()=>router.push(`/pages/produits/${item.id}`)}> <EditIcon className='edit' /> </span>
                {item.stocks <= 0 && 
                  <span onClick={()=>handledelete(item.id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </th>
                </tr>
              </tbody>))}
              {/*afficher cette partie si la valeur de recheche est nul et lavaleur de selection est null */}
              {(!searchValue && !selection ) &&
                produits.map((item)=>(
                  <tbody className='table-body' key={item.id}>
               <tr className='ligne-body' >
               
                <th className='colon'>{item.nom}</th>
                <th className='colon'>{item.categories}</th>
                <th className='colon'>{item.prixAchat} FCFA</th>
                <th className='colon'>{item.prixVente} FCFA</th>
                <th className='colon'>{item.stocks <= 0 ? <span className='fini'>Ce stock est fini</span> : item.stocks}</th>
                <th className='colon'>{item.dateAchat}</th>
                <th className='colon'>
                {item.stocks > 0 && <span onClick={()=>handleAjouter(item)}><ShoppingCartIcon className='ico' /></span>}
                <span onClick={()=>router.push(`/pages/produits/${item.id}`)}> <EditIcon className='edit' /> </span>
                {item.stocks <= 0 &&                  
                  <span onClick={()=>handledelete(item.id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </th>
                </tr>
              </tbody>))}
              </table>
            </div>
        </section>
        </main>
        </>
    );
}

export default Produits;
