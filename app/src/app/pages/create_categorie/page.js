"use client"
import axios from 'axios'
import React, { useState } from 'react'

const CreateCategorie = () => {
    const [categorie, setCategorie] = useState({
        name:"",
    })

    //etat de stockage d'erreur
    const [error , setError] = useState('')
   //focntion de changer les champs
   const handleChange =(e)=>{
    const {name,value} = e.target
    setCategorie({...categorie,[name]:value})
}

const handleAdd=async()=>{
    if(categorie.name.length > 0){
        try{
            const res = await axios.post("/api/categories", categorie)
           }catch(e){
               console.log[e]
           }
    }else{
        setError("Remplir le champs")
    }
   
}

  return (
     
    <main className='create-categorie'>
    <section className='header'>
     <h1>Ajouter des categories</h1>
    </section>
    <form className='create-container' onSubmit={()=>handleAdd()}>
    
     <section className='form'>
     <label>Nom</label>
     <input type='text' name='name' value={categorie.name} onChange={(e)=>handleChange(e)} placeholder="nom du categorie.."/>
     {categorie.name.length <= 0 && <span>{error}</span>}
     </section> 

    <button className='btn-save' type='submit'>Enregistrer</button>
    </form>
</main>

  )
}

export default CreateCategorie