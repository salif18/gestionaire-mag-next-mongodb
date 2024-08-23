"use client"
import React, { useContext, useState } from 'react';
import { MyStore } from '../../context/store';
import { useRouter } from 'next/navigation';

const AddProduits = () => {
    const router = useRouter
    const {handleSave, message} = useContext(MyStore)
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

    //valeurs des options de formulaire
    const options = [
        {value:'Parfum',label:'Parfum'},
        {value:'Pommade',label:'Pommade'},
        {value:'Deodorant',label:'Deodorant'},
        {value:'Lait',label:'Lait'},
        {value:'Lotion',label:'Lotion'},
        {value:'Autres',label:'Autres'},
        {value:'Tube',label:'Tube'},
        {value:'Savon',label:'Savon'},
    ]

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
                <option key={item.value} value={item.value}>{item.label}</option>
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
