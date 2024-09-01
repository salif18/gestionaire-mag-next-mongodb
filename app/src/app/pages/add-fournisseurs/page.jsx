"use client"
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyStore } from '../../context/store'
import withAuth from '../../withAuth'

const Fournisseurs = () => {
  const {userId, token } = useContext(MyStore)
  const [alertMessage ,setAlertMessage] =useState("")

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
    // Fonction d'ajout et contrôle d'ajout dans la base de données
const handleAdd = async () => {
  if (
      fournisseur.nom.length <= 0 || 
      fournisseur.prenom.length <= 0 || 
      fournisseur.numero.length <= 0 || 
      fournisseur.address.length <= 0 || 
      fournisseur.produit.length <= 0
  ) {
      setError('Veuillez remplir tous les champs');
  } else {
      try {
          const res = await axios.post(
              "/api/fournisseurs", 
              { userId, ...fournisseur },
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                  },
              }
          );

          if (res.status === 201) {
              const data = res.data;
              setAlertMessage(data.message); // Vous pouvez manipuler les données ici si besoin
          }

          // Réinitialisation des champs du formulaire
          setFournisseur({
              prenom: "",
              nom: "",
              numero: "",
              address: "",
              produit: "",
          });

      } catch (e) {
          console.log(e);
      }
  }
};
useEffect(() => {
    if (alertMessage) {
        const timer = setTimeout(() => {
            setAlertMessage('');
        }, 2000);
        return () => clearTimeout(timer);
    }
}, [alertMessage]);


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

            <button className='btn-save' type='submit'>{!alertMessage ? "Enregistrer" : alertMessage}</button>
            </form>
        </main>
  )
}

export default withAuth(Fournisseurs)