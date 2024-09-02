"use client"

import React, { useContext, useEffect, useState } from 'react'
import withAuth from '../../../withAuth'
import { MyStore } from '@/src/app/context/store'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const DepenseListe = () => {
  const { userId ,token} = useContext(MyStore)
  const [opperations,setOpperations] = useState([])
  const [dateValue, setDateValue] = useState('');

   //charger les depenses
   useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`/api/depenses/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
     .then((res) =>{
      setOpperations(res.data.results)
     }).catch(err => console.error(err))
    };
    getDepenses()
},[userId, token])

 //supprimer la depense
 const handleDelete =(id)=>{
  axios.delete(`/api/depenses/single/${id}`,{
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`,
   },
 })
  .then((res) => res.data)
  .catch((err) => console.error(err))
};


    //calcule de la somme du depense journaliere
    const calcul =()=>{
      const filterDepense = opperations?.filter((x) => x.createdAt.includes(dateValue))
      const prix  = filterDepense.map((a) => a.montants );
      const sum = prix.reduce((a,b) => a + b,0)
      return sum
    }
    const sommeDujour = calcul()

    //filtrage par date
    const opperationFilter = opperations.filter((x) => x.createdAt.includes(dateValue))
 

  return (
    <section className='depenselist'>
       <header className='header-depenses'>
              <h1>Les dépenses</h1>     
       </header>
      
       <section className='list-zone'>
            <section className='filtre'>
            <section className='infos'>
            <label>Dépenses du </label>
            <h3>Total</h3>
             <span>{sommeDujour} FCFA</span>
             </section>
            <input type='date' value={dateValue} onChange={(e)=>setDateValue(e.target.value)} />
           
            </section>
            <section className='section-list'>
            {opperationFilter.length <=0 && <span className='aucun'>Aucunes dépenses</span>}
            { opperationFilter.map((item)=>(
              <article className='card-depense' key={item._id}>
             <section className='rig'>
             <h3>MONTANTS</h3>
               <p>{item.montants} FCFA</p>
             </section>
             <section className='rig'>
             <h3>MOTIFS</h3>
             <p>{item.motifs}</p>
             </section> 
             <section className='rig'>
             <h3>DATE</h3>
             <p>{new Date(item.createdAt).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
             </section> 
             <span className='btn-depense' onClick={()=>handleDelete(item._id)}><DeleteIcon className='icon' /></span>
             
             </article>
             ))}
             </section>
            </section>
     
    </section>
  )
}

export default withAuth(DepenseListe)
