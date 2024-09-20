"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ConfirmPage = () => {

    const router = useRouter();
    const [alertMessage, setAlertMessage] = useState("");
    const [data , setData ] = useState({resetToken:"", newPassword:"", confirmPassword:""});

    const handleChange=(e)=>{
     const {name , value } = e.target;
     setData({...data ,[name]:value})
    }

    const handleSbumit=async(e)=>{
        e.preventDefault();
        if(data.numero.length > 0 && data.email.length > 0){
            const newData ={
                reset_token: data.resetToken,
                new_password: data.newPassword,
                confirm_password:data.confirmPassword
            }
             try{
                const res = await axios.post(`${process.env.NEXT_PUBLIC_URI}/reset/reset_valid`, newData);
                const data = await res.data;
                if(res.status === 200){
                    router.push("/");
                    setAlertMessage(data.message)
                }
                
         }catch(e){
            if (e.response) {
                setAlertMessage(e.response.data.message); // Message d'erreur spécifique depuis le serveur
            } else {
                setAlertMessage("Erreur lors de la connexion. Veuillez réessayer.");
            }
         }
        }
        setAlertMessage("Veuiller remplir tous les champs")
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
    <section className='confirm-page'>
       <form className='form' onSubmit={handleSbumit}>
       <h1>Recuperation de votre compte</h1>
       <p>Veuillez entrer les bonnes informations pour pouvoir recuperer votre compte</p>
         <section className='form-content'>
          <label htmlFor='password' >Nouveau</label>
          <input id='password' type='password' name='newPassword' value={data.newPassword} onChange={handleChange} placeholder='nouveau mot de passe' />
          {data.newPassword.length > 0 ? null : <span>{alertMessage}</span>}
         </section>
         <section className='form-content'>
          <label htmlFor='confirm'>Confirmation</label>
          <input id='confirm' type='password' name='confirmPassword' value={data.confirmPassword} onChange={handleChange} placeholder='confirmation de mot de passe'/>
          {data.confirmPassword.length > 0 ? null : <span>{alertMessage}</span>}
         </section>
         <section className='form-content'>
          <label htmlFor='code'>Code de validation</label>
          <input id='code' type='number' name='resetToken' value={data.resetToken} onChange={handleSbumit} placeholder='entrer les quatres chiffres envoyer sur votre email'/>
          {data.resetToken.length > 0 ? null : <span>{alertMessage}</span>}
         </section>
         <button className='btn-send' type='submit' >Envoyer</button>
       </form>
      </section>
  )
}

export default ConfirmPage