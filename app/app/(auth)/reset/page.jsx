"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios";

const ResetPage = () => {
    const router = useRouter();
    const [alertMessage, setAlertMessage] = useState("");
    const [user , setUser ] = useState({numero:"", email:""});
    const handleChange=(e)=>{
     const {name , value } = e.target;
     setUser({...user ,[name]:value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(user.numero.length > 0 && user.email.length > 0){
            console.log(user)
             try{
                const res = await axios.post(`${process.env.NEXT_PUBLIC_URI}/reset/reset_token`,user);
                const data = await res.data; 
                   console.log(data)
                if(res.status === 200){
                
                    router.push("/confirm");
                }else{
                  setAlertMessage(data.message)
                }           
         }catch(e){
            if (e.response) {
                setAlertMessage(e.response.data.message); // Message d'erreur spécifique depuis le serveur
            } else {
                setAlertMessage("Erreur lors de la connexion. Veuillez réessayer.");
            }
         }
        }else{
             setAlertMessage("Veuiller remplir tous les champs")
        }
    }

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

  return (
    <section className='reset-page'>
       <form className='form' onSubmit={handleSubmit}>
       <h1>Recuperation de votre compte</h1>
       <p>Veuillez entrer les bonnes informations pour pouvoir recuperer votre compte</p>
         <section className='form-content'>
          <label htmlFor='numero'>Numero</label>
          <input  id='numero' type='number' name='numero' value={user.numero} onChange={handleChange} placeholder='numéro' />
          {user.numero.length > 0 ? null : <span>{alertMessage}</span>}
         </section>
         <section className='form-content'>
          <label htmlFor='email' >Email</label>
          <input id='email' type='email' name='email' value={user.email} onChange={handleChange} placeholder='email' />
          {user.email.length > 0 ? null : <span>{alertMessage}</span>}
         </section>
         <button className='btn-send' type='submit' >Envoyer</button>
       </form>
      </section>
  )
}

export default ResetPage
