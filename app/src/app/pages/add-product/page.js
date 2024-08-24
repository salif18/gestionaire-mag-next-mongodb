"use client"
import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddProduits = () => {
    const router = useRouter
    const {handleSave, message} = useContext(MyStore)
    const [options ,setOptions ] = useState([])
    //etat initial des champs de formulaire
    const [produits, setProduits] = useState({
        nom:"",
        categories:"",
        prixAchat:"",
        prixVente:"",
        stocks:"",
        dateAchat:""
    })
   //etat de stockage d'erreur
    const [error , setError] = useState('')

    
  //charger les depenses
  useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`/api/categories`)
     .then((res) =>{
      setOptions(res.data.results)
     }).catch(err => console.error(err))
    };
    getDepenses()
},[])

    

    //focntion de changer les champs
    const handleChange =(e)=>{
        const {name,value} = e.target
        setProduits({...produits,[name]:value})
    }

    //fonction d'ajout e controle dajout dans la base de donnee
    const handleAdd = () =>{
        if( produits.nom.length <= 0 || 
            produits.prixAchat.length <= 0 || 
            produits.prixVente.length <= 0 || 
            produits.stocks.length <= 0 || 
            produits.dateAchat.length <= 0 || 
            produits.categories.length <= 0){
           setError('Veuiller remplir ce champs')
        }else{
          handleSave(produits)
          setProduits({
            nom:"",
            categories:"",
            prixAchat:"",
            prixVente:"",
            stocks:"",
            dateAchat:""
        })
          router.push('/pages/produits')
        }
    }


    //vue frontend
    return (
        
        <main className='addproduits'>
            <section className='header-add'>
             <h1>Ajouter des produits</h1>
            </section>
            <form className='add-container' onSubmit={()=>handleAdd()}>
            
             <section className='form'>
             <label>Prix d'achats</label>
             <input type='number' name='prixAchat' value={produits.prixAchat} onChange={(e)=>handleChange(e)} placeholder="Prix d'achat.."/>
             {produits.prixAchat.length <= 0 && <span>{error}</span>}
             </section>

             <section className='form'>
            <label>Prix de ventes</label>
            <input type='number' name='prixVente' value={produits.prixVente} onChange={(e)=>handleChange(e)} placeholder='Prix de vente..' />
            {produits.prixVente.length <= 0 && <span>{error}</span>}
            </section>
              <span className='messge-add'>{message}</span>
            

           
            
            <section className='form'>
            <label>Nom</label>
            <input type='text' name='nom' value={produits.nom} onChange={(e)=>handleChange(e)} placeholder='Nom du produit' />
            {produits.nom.length <= 0 && <span>{error}</span>}
            </section>

            <section className='form'>
            <label >Catégories</label>
            <select type='text' name='categories' value={produits.categories} onChange={(e)=>handleChange(e)} placeholder='Categorie'>
            <option >Catégorie--Select</option>
            {options.map((item) =>(
                <option key={item.name} value={item.name}>{item.name}</option>
            ))}
            </select>
            {produits.categories.length <= 0 && <span>{error}</span>}
            </section>

            <section className='form'>
             <label>Date</label>
             <input type='date' name='dateAchat' value={produits.dateAchat} onChange={(e)=>handleChange(e)}/>
             {produits.dateAchat.length <= 0 && <span>{error}</span>}
             </section>
            

            <section className='form'>
            <label>Quantités</label>
            <input className='input-qty' type='number' name='stocks' value={produits.stocks} onChange={(e)=>handleChange(e)} placeholder='Quantites de stocks' />
            {produits.stocks.length <= 0 && <span>{error}</span>}
            </section>
            

            <button className='btn-save' type='submit'>Enregistrer</button>
            </form>
        </main>
        
    );
}

export default AddProduits;
