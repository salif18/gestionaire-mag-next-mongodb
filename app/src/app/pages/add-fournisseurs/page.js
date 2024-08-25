"use client"
import axios from 'axios'
import React, { useState } from 'react'

const Fournisseurs = () => {

    const [fournisseur, setFournisseur] = useState({
        prenom:"",
        nom:"",
        numero:"",
        address:"",
        produit:"",
    })
   //etat de stockage d'erreur
    const [error , setError] = useState('')

    
    //focntion de changer les champs
    const handleChange =(e)=>{
        const {name,value} = e.target
        setFournisseur({...fournisseur,[name]:value})
    }

     //fonction d'ajout e controle dajout dans la base de donnee
     const handleAdd = async() =>{
        if( fournisseur.nom.length <= 0 || 
            fournisseur.prenom.length <= 0 || 
            fournisseur.numero.length <= 0 || 
            fournisseur.address.length <= 0 || 
            fournisseur.produit.length <= 0 ){
           setError('Veuiller remplir ce champs')
        }else{
          try{
          const res = await axios.post("/api/fournisseurs", fournisseur)
          if(res){
            const data = res.data
          }
          setFournisseur({
            prenom:"",
            nom:"",
            numero:"",
            address:"",
            produit:"",
        })
          
        }catch(e){
        console.log(e)
      }
    }
    }
  return (
    <main className='addfournisseurs'>
            <section className='header-add'>
             <h1>Ajouter des fournisseurs</h1>
            </section>
            <form className='add-container' onSubmit={()=>handleAdd()}>
            
             <section className='form'>
             <label>Prenom</label>
             <input type='text' name='prenom' value={fournisseur.prenom} onChange={(e)=>handleChange(e)} placeholder="prenom du fournisseur.."/>
             {fournisseur.prenom.length <= 0 && <span>{error}</span>}
             </section>

             <section className='form'>
            <label>Nom</label>
            <input type='text' name='nom' value={fournisseur.nom} onChange={(e)=>handleChange(e)} placeholder='nom du fournisseur..' />
            {fournisseur.nom.length <= 0 && <span>{error}</span>}
            </section>
              
            <section className='form'>
             <label>Numero</label>
             <input type='number' name='numero' value={fournisseur.numero} onChange={(e)=>handleChange(e)} placeholder='téléphone...' />
             {fournisseur.numero.length <= 0 && <span>{error}</span>}
             </section>
            

            <section className='form'>
            <label>Address</label>
            <input className='input-qty' type='text' name='address' value={fournisseur.address} onChange={(e)=>handleChange(e)} placeholder='address' />
            {fournisseur.address.length <= 0 && <span>{error}</span>}
            </section>

            <section className='form'>
            <label>Produits</label>
            <input  type='text' name='produit' value={fournisseur.produit} onChange={(e)=>handleChange(e)} placeholder='produit' />
            {fournisseur.produit.length <= 0 && <span>{error}</span>}
            </section>
            

            <button className='btn-save' type='submit'>Enregistrer</button>
            </form>
        </main>
  )
}

export default Fournisseurs