"use client"
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MyStore } from '@/src/app/context/store';
import withAuth from './withAuth';
import ChecklistIcon from '@mui/icons-material/Checklist';



const Depenseur = () => {
  const {message,sendDepensesToDataBase} = useContext(MyStore)
  const router = useRouter()
 

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
    
   

    const handleNavigate =()=>{
        router.push("/pages/depenses/list")
    }


    return (
      
        <section className='depenseurs'>
            <header className='header-fournisseurs'>
              <h1>Enregistrer vos dépenses</h1>
            </header>
            <section className='form-zone'>
            <aside className='left'>
                <p className='link' onClick={handleNavigate} ><ChecklistIcon style={{marginRight:5, fontSize:24}}/> Liste des dépenses</p>
              </aside>
            <form>
            
             <sectin className='colonne'>
             <label>Montant</label>
             <input type='number' name='montants' value={depenses.montants} onChange={(e)=>handleChange(e)} placeholder='Montant...'/>
             { depenses.montants.length <= 0 && <span>{error}</span>}
             </sectin>
             <section className='colonne'>
             <label>Description</label>
             <input type='text' name='motifs' value={depenses.motifs} onChange={(e)=>handleChange(e)} placeholder='description...'  /> 
            {depenses.motifs.length <=0 && <span>{error}</span>}
             </section>
             <button className='btn-save'  onClick={(e)=>handleSend(e)}>{!message ? "Enregistrer" : message}</button>
        
            </form>

           
            </section>
        </section>
    );
}

export default withAuth(Depenseur)
