"use client"
import React, {useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/layouts/Navbar';
import SideBar from '../../components/layouts/SideBar';

const BestVente = () => {

    const [bestVendu ,setBestVendu] = useState([])
    //recuperer les meilleur vente
  useEffect(()=>{
    const getBestVente =()=>{
      axios.get(`/api/ventes/stats-by-categories`)
      .then((res)=>{
       setBestVendu(res.data.results)
      }).catch((err)=>console.error(err))
    };
    getBestVente()
 },[])
    return (
      <>
      <Navbar/>
      <main className='App'>
      <SideBar/>
        <section className='bestvente'>
        <header className='header-best'>
        <h1>TENDANCE DU MARCHE</h1>
      </header>
      <div className='best-container'>
      <h1>Produits les plus achetes</h1>
      {bestVendu.map((item) =>(
        <div className='card-best' key={item.id}>
         <h1>{item.nom}</h1>
         <span>{item.categories}</span>
         <p>{item.total_vendu}</p>
        </div>
      ))}
      </div>
        </section>
        </main>
        </>
    );
}

export default BestVente;
