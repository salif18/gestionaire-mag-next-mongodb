"use client"

import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'


const Registre = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        boutique_name:"",
        numero: "",
        email: "",
        password: ""
    });
    const [alertMessage, setAlertMessage] = useState("");

    // obtenir les valeurs des champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.name.length > 0 && user.numero.length > 0 && user.email.length > 0 && user.password.length > 0) {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_URI}/auth/registre`, user);
                const data = await res.data;

                if (res.status === 201) { // Vérification du statut de la réponse
                     // Le cookie expire après 30 jours
                     Cookies.set('userName', data.userName, { expires: 1 });
                     Cookies.set('cookiesToken', data.token, { expires: 1 });
                     Cookies.set('cookiesUserId', data.userId, { expires: 1 });
                     Cookies.set('entreprise', data.entreprise, { expires: 1 });
                    setUser({
                        name: "",
                        boutique_name:"",
                        numero: "",
                        email: "",
                        password: ""
                    });
                    router.push("/home"); // Redirige vers la page d'accueil après l'inscription
                }
            } catch (e) {
                if (e.response) {
                    setAlertMessage(e.response.data.message); // Message d'erreur spécifique depuis le serveur
                } else {
                    setAlertMessage("Erreur lors de la connexion. Veuillez réessayer.");
                }
            }
        } else {
            setAlertMessage("Veuillez remplir les champs");
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
        <section className='registre'>
          
           
                <form className='form' onSubmit={handleSubmit}>
                <section className='header'>
                    <p>Créer un compte</p>
                </section>
                    <section className='column'>
                        <label htmlFor='name'>Nom</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder='Votre nom'
                        />
                        {user.name.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    <section className='column'>
                        <label htmlFor='name'>Entreprise</label>
                        <input
                            type="text"
                            name="boutique_name"
                            value={user.boutique_name}
                            onChange={handleChange}
                            placeholder='Nom de votre entreprise'
                        />
                        {user.boutique_name.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    <section className='column'>
                        <label htmlFor='numero'>Numéro</label>
                        <input
                            type="number"
                            name="numero"
                            value={user.numero}
                            onChange={handleChange}
                            placeholder='Votre numéro de téléphone'
                        />
                        {user.numero.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    <section className='column'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder='Votre email'
                        />
                        {user.email.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    <section className='column'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input
                            type="password" // Sécuriser le champ mot de passe
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='Votre mot de passe'
                        />
                        {user.password.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    <button className='btn-inscription' type='submit'>S'inscrire</button>
                    <section className='se-log'>
                    <p className='no-compte'>Vous avez déjà un compte ?</p>
                        <p onClick={()=>router.push("/")}>Se connecter</p>
                    </section>
                </form>
            </section>
        
    );
}

export default Registre;
