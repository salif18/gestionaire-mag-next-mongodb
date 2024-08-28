"use client"
import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../../context/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddProduits = () => {
    const router = useRouter();
    const { userId, token, setMessage, message } = useContext(MyStore);
    const [options, setOptions] = useState([]);
    const [produits, setProduits] = useState({
        nom: "",
        categories: "",
        prix_achat: "",
        prix_vente: "",
        stocks: "",
        date_achat: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDepenses = async () => {
            try {
                const res = await axios.get(`/api/categories/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setOptions(res.data.results);
            } catch (err) {
                console.error(err);
            }
        };
        getDepenses();
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduits({ ...produits, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!produits.nom || !produits.prix_achat || !produits.prix_vente || !produits.stocks || !produits.date_achat || !produits.categories) {
            setError('Veuillez remplir tous les champs.');
        } else {
            try {
                const data = {
                    userId: userId,
                    nom: produits.nom,
                    categories: produits.categories,
                    prix_achat: produits.prix_achat,
                    prix_vente: produits.prix_vente,
                    stocks: produits.stocks,
                    date_achat: produits.date_achat
                };
                const res = await axios.post(`/api/produits`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (res.status === 201) {
                    const responseData = res.data;
                    setMessage(responseData.message);
                    router.push('/pages/produits');
                }
            } catch (e) {
                console.error(e);
            }
            setProduits({
                nom: "",
                categories: "",
                prix_achat: "",
                prix_vente: "",
                stocks: "",
                date_achat: ""
            });
        }
    };


    //vue frontend
    return (

        <main className='addproduits'>
            <section className='header-add'>
                <h1>Ajouter des produits</h1>
            </section>
            <form className='add-container' onSubmit={handleSubmit}>

                <section className='form'>
                    <label>Prix d'achats</label>
                    <input type='number' name='prix_achat' value={produits.prix_achat} onChange={(e) => handleChange(e)} placeholder="Prix d'achat.." />
                    {produits.prix_achat.length <= 0 && <span>{error}</span>}
                </section>

                <section className='form'>
                    <label>Prix de ventes</label>
                    <input type='number' name='prix_vente' value={produits.prix_vente} onChange={(e) => handleChange(e)} placeholder='Prix de vente..' />
                    {produits.prix_vente.length <= 0 && <span>{error}</span>}
                </section>
                <span className='messge-add'>{message}</span>




                <section className='form'>
                    <label>Nom</label>
                    <input type='text' name='nom' value={produits.nom} onChange={(e) => handleChange(e)} placeholder='Nom du produit' />
                    {produits.nom.length <= 0 && <span>{error}</span>}
                </section>

                <section className='form'>
                    <label >Catégories</label>
                    <select type='text' name='categories' value={produits.categories} onChange={(e) => handleChange(e)} placeholder='Categorie'>
                        <option >Catégorie--Select</option>
                        {options.map((item) => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                    {produits.categories.length <= 0 && <span>{error}</span>}
                </section>

                <section className='form'>
                    <label>Date</label>
                    <input type='date' name='date_achat' value={produits.date_achat} onChange={(e) => handleChange(e)} />
                    {produits.date_achat.length <= 0 && <span>{error}</span>}
                </section>


                <section className='form'>
                    <label>Quantités</label>
                    <input className='input-qty' type='number' name='stocks' value={produits.stocks} onChange={(e) => handleChange(e)} placeholder='Quantites de stocks' />
                    {produits.stocks.length <= 0 && <span>{error}</span>}
                </section>


                <button className='btn-save' type='submit'>Enregistrer</button>
            </form>
        </main>

    );
}

export default AddProduits;
