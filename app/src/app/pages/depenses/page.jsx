"use client"
import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/store';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';


const Depenseur = () => {
  const {message, sendDepensesToDataBase, userId ,token} = useContext(MyStore)
  const [dateValue, setDateValue] = useState('');
  const [opperations,setOpperations] = useState([])
  const router = useRouter()
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

  //etat initial des champs formulaire
  const [depenses,setDepenses] = useState({ montants:'', motifs:''})

  //etat de stockage d'erreur
  const [error , setError] = useState('');

  //valeurs de la selections
  const options = [
    {values:'Dépenses-personnelles',label:'DEPENSES-PERSONNELLES'},
    {values:'Payement-location',label:'PAYEMENT-LOCATION'},
    {values:"Payement-Electricité",label:"PAYEMENT-ELECTRICITE"}
  ];
   
  //change letat
    const handleChange=(e)=>{
      const {name,value} = e.target;
      setDepenses({...depenses,[name]:value})
    };

    //envoyer la depense
    const handleSend =(e)=>{
      e.preventDefault();
      if(depenses.montants.length <= 0 || depenses.motifs.length <= 0){
       setError('Veuiller ajouter les valeurs')
      }else{
        sendDepensesToDataBase(depenses)
        setDepenses({ montants:'', motifs:''});
        router.push('/pages/depenses')
      }
    };
    
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
      <>
  
      <main className='App'>
      
        <section className='depenseurs'>
            <header className='header-fournisseurs'>
              <h1>Enregistrer vos dépenses</h1>
            </header>
            <div className='contacts-zone'>
            <form>
            <div className='left-zone'>
             <div className='con'>
             <label>MONTANTS</label>
             <input type='number' name='montants' value={depenses.montants} onChange={(e)=>handleChange(e)} placeholder='Montant...'/>
             { depenses.montants.length <= 0 && <span>{error}</span>}
             </div>
             <div className='con'>
             <label>MOTIFS</label>
             <select type='text' name='motifs' value={depenses.motifs} onChange={(e)=>handleChange(e)} >
            <option >Sélectionner--un--motif</option>
            {options.map((item) =>(
                <option key={item.values} value={item.values}>{item.label}</option>
            ))}
            </select>
            {depenses.motifs.length <=0 && <span>{error}</span>}
             </div>
             <span className='messge-dep'>{message}</span>
             <button className='btn-contact'  onClick={(e)=>handleSend(e)}>Enregistrer</button>
             
            </div>
            </form>

            <div className='rigth-zone'>
            <div className='filtre'>
            <label>Dépenses du </label>
            <input type='date' value={dateValue} onChange={(e)=>setDateValue(e.target.value)} />
            <div className='donto'>
            <h3>Total</h3>
             <span>{sommeDujour} FCFA</span>
             </div>
            </div>
            {opperationFilter.length <=0 && <span className='aucun'>Aucunes dépenses</span>}
            { opperationFilter.map((item)=>(
              <div className='card-contact' key={item._id}>
             <div className='rig'>
             <h3>MONTANTS</h3>
               <p>{item.montants} FCFA</p>
             </div>
             <div className='rig'>
             <h3>MOTIFS</h3>
             <p>{item.motifs}</p>
             </div> 
             <div className='rig'>
             <h3>DATE</h3>
             <p>{new Date(item.createdAt).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
             </div> 
             <span className='btn-depense' onClick={()=>handleDelete(item._id)}><DeleteIcon className='i' /></span>
             
             </div>
             ))}
            </div>
            </div>
        </section>
        </main>
        </>
    );
}

export default Depenseur;