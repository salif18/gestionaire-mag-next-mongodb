"use client"
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { MyStore } from '../../context/store';
import Navbar from '../../components/layouts/Navbar';
import SideBar from '../../components/layouts/SideBar';
import { useRouter } from 'next/navigation';



const ListeVente = () => {
  const router = useRouter()
  const {cancelStock} = useContext(MyStore)
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
   cancelStock(item)
}

message && setTimeout(()=>setMessage(''),2000)
//vue de frontend
    return (
      <>
      <main className='App'>
        <section className='list'>
            <header className='header-list'>
              <h1>Les Produits vendus</h1>
            </header>
            <div className='tableau-de-vente'>
             <table className='table'>
             <thead className='head_1'>
             <tr className='li_1'>
             <th className='co'>NOMS</th>
             <th className='co'>CATEGORIES</th>
             <th className='co'>PRIX DE VENTE</th>
             <th className='co'>QUATITES</th>
             <th className='co'>DATE</th>
             <th className='co'>ANNULER UNE VENTE</th>
             </tr>
             </thead>
             {vendues.map((item)=>(
              <tbody key={item._id}>
             <tr className='li_2' >
               <th className='co2'>{item.nom}</th>
               <th className='co2'>{item.categories}</th>
               <th className='co2'>{item.prixVente*item.qty} FCFA</th>
               <th className='co2'>{item.qty}</th>
               <th className='co2'>{item.timestamps}</th>
               <span className='cancel' onClick={()=>handledelete(item)}> <RotateLeftIcon  />  Annuler </span>
              
             </tr>
             </tbody>))}
             <span className='messge-vente-list'>{message}</span>
             </table>
            </div>
        </section>
        </main>
        </>
    );
}

export default ListeVente;
