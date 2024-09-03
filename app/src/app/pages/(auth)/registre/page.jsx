"use client"
import { MyStore } from '@/src/app/context/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import React, { useContext, useEffect, useState } from 'react'

const Registre = () => {
    const { login } = useContext(MyStore);
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
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
                const res = await axios.post("/api/registre", user);
                const data = await res.data;

                if (res.status === 201) { // Vérification du statut de la réponse
                 
                    login(data.token, data.userId, data.userName);
                     // Le cookie expire après 30 jours
                     Cookies.set('cookiesToken', data.token, { expires: 1 });
                     Cookies.set('cookiesUserId', data.userId, { expires: 1 });
                    setUser({
                        name: "",
                        numero: "",
                        email: "",
                        password: ""
                    });
                    router.push("/pages/home"); // Redirige vers la page d'accueil après l'inscription
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
             {/* <section className='title'>
            <h1>GestaShop</h1>
        </section> */}
            <section className='form-content'>
            <section className='header'>
                    <p>Créer un compte</p>
                </section>
                <form className='form' onSubmit={handleSubmit}>
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
        </section>
    );
}

export default Registre;
