"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { config as configDotenv } from "dotenv";
configDotenv();

const Login = () => {
    const token = Cookies.get('cookiesToken');
    const router = useRouter();
    const [user, setUser] = useState({
        contacts: "",
        password: ""
    });

    useEffect(() => {
        if (token) {
            router.replace('/pages/home');
        }
    }, [token, router]);

    const [alertMessage, setAlertMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    // obtenir les valeurs du champ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.contacts.length > 0 && user.password.length > 0) {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_URI}/auth/login`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                  },
                user);
                const data = await res.data;

                if (res.status === 200) { // Vérification du statut de la réponse
                    Cookies.set('cookiesToken', data.token, { expires: 1 });
                    Cookies.set('cookiesUserId', data.userId, { expires: 1 });
                    Cookies.set('userName', data.userName, { expires: 1 });
                    Cookies.set('entreprise', data.entreprise, { expires: 1 });
                    if (rememberMe) {
                        // Le cookie expire après 30 jours
                        Cookies.set('cookiesToken', data.token, { expires: 1 });
                        Cookies.set('cookiesUserId', data.userId, { expires: 1 });
                        Cookies.set('userName', data.userName, { expires: 1 });
                        Cookies.set('entreprise', data.entreprise, { expires: 1 });
                    } else {
                        sessionStorage.setItem("sessionToken", data.token)
                    }

                    setUser({ contacts: "", password: "" });
                    router.push("/pages/home"); // Redirige vers la page d'accueil après la connexion
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
        <section className='login'>
            {/* <section className='title'>
            <h1>GestaShop</h1>
        </section> */}

            <section className='form-content'>
                <section className='header'>
                    <p>Connexion</p>
                </section>
                <form className='form' onSubmit={handleSubmit}>
                    <section className='column'>
                        <label htmlFor='contacts'>Numéro ou Email</label>
                        <input
                            type="text"
                            name="contacts"
                            value={user.contacts}
                            onChange={handleChange}
                            placeholder='Votre numéro ou email'
                        />
                        {user.contacts.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    <section className='column'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input
                            type="password" // Changer le type à "password" pour sécuriser le champ
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='Votre mot de passe'
                        />
                        {user.password.length > 0 ? null : <span>{alertMessage}</span>}
                    </section>
                    {!alertMessage ? null : <span>{alertMessage}</span>}
                    <section className='check'>
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Se souvenir de moi
                        </label>
                    </section>
                    <section className='forget-password'>
                        <p>Mot de passe oublié ?</p>
                    </section>
                    <button className='btn-connexion' type='submit'>Se connecter</button>
                    <section className='create-new'>
                        <p className='no-compte'>Vous n'avez pas de compte ?</p>
                        <p onClick={() => router.push("/pages/registre")}>Créer votre compte</p>
                    </section>
                </form>
            </section>
        </section>
    )
}

export default Login;
