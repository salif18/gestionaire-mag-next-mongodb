"use client"
import { config as configDotenv } from "dotenv";
configDotenv();
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const SingleProduits = () => {
  //etat de stockage d'erreur
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");
  const [error, setError] = useState('')
  //recuperation dune seul donnee selectioner
  const [items, setItems] = useState({})
  const [alertMessage ,setAlertMessage] =useState("")
  const [options, setOptions] = useState([])
  const router = useRouter();
  const { id } = useParams()

  const [messages, setMessages] = useState('')
  //etat initial des champs de formulaire
  const [produits, setProduits] = useState({
    image:"",
    nom: "",
    categories: "",
    prix_achat: "",
    prix_vente: "",
    stocks: "",
  })


  //recuperer le produit de id
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URI}/produits/single/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        setItems(res.data.results)
        setProduits({
          nom: res.data.results.nom || "",
          categories: res.data.results.categories || "",
          prix_achat: res.data.results.prix_achat || "",
          prix_vente: res.data.results.prix_vente || "",
          stocks: res.data.results.stocks || ""
        })
      }).catch((err) => console.error(err))
  }, [id, token])



  useEffect(() => {
    const getDepenses = () => {
      axios.get(`${process.env.NEXT_PUBLIC_URI}/categories/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          setOptions(res.data.results)
        }).catch(err => console.error(err))
    };
    getDepenses()
  }, [userId,token])

  //changement de etat des champs
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduits({ ...produits, [name]: value })
  }

  const pickedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProduits({ ...produits, image: file });
    } else {
        setError("Veuillez sélectionner une image.");
    }
};


  //fonction envoie des donnee modifier dans le backend
  const handlePut = (id) => {

    // const formData = new FormData();
    // formData.append("userId", userId);
    // formData.append("image", produits.image);
    // formData.append("nom", produits.nom);
    // formData.append("categories", produits.categories);
    // formData.append("prix_achat", produits.prix_achat);
    // formData.append("prix_vente", produits.prix_vente);
    // formData.append("stocks", produits.stocks);
    // formData.append("date_achat", produits.date_achat);
    
    axios.put(`${process.env.NEXT_PUBLIC_URI}/produits/single/${id}`, produits, {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAlertMessage(response.data.message)
      }).catch((err) => console.error(err));
    setProduits({
      image:"",
      nom: "",
      categories: "",
      prix_achat: "",
      prix_vente: "",
      stocks: "",
    })
  };


  //supprimer le produit
  const handledelete = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_URI}/produits/single/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMessages(res.data.message)
      })
      .catch((err) => console.error(err))
  }

 
  useEffect(() => {
    if (alertMessage) {
        const timer = setTimeout(() => {
            setAlertMessage('');
        }, 2000);
        return () => clearTimeout(timer);
    }
}, [alertMessage]);


  //le rendue vue
  return (

    <main className='single'>
      <section className='header-single'>
        <h1>Modification du produit</h1>
      </section>


      <section className='update-form'>

      <section className='form'>
                    <label htmlFor='upload'>Image du produit</label>
                    <input type='file' id='upload' name='image' accept='image/*' onChange={(e) => pickedImage(e)} placeholder="Photo.." />
                    {produits.prix_achat.length <= 0 && <span>{error}</span>}
                </section>

        <section className='form'>
          <label>Prix d'achats</label>
          <input type='text' name='prix_achat' value={produits.prix_achat} onChange={(e) => handleChange(e)} placeholder={items?.prix_achat} />
          {produits.prix_achat.length <= 0 && <span>{error}</span>}
        </section>

        <section className='form'>
          <label>Prix de ventes</label>
          <input type='number' name='prix_vente' value={produits.prix_vente} onChange={(e) => handleChange(e)} placeholder={items?.prix_vente} />
          {produits.prix_vente.length <= 0 && <span>{error}</span>}
        </section>
        <span className='messge-single'>{messages}</span>



        <section className='form'>
          <label>Nom</label>
          <input type='text' name='nom' value={produits.nom} onChange={(e) => handleChange(e)} placeholder={items?.nom} />
          {produits.nom.length <= 0 && <span>{error}</span>}
        </section>
        <section className='form'>
          <label >Categories</label>
          <select type='text' name='categories' value={produits.categories} onChange={(e) => handleChange(e)} placeholder='Categorie'>
            <option >{items?.categories ? items?.categories : "Catégorie--Select"}</option>
            {options.map((item) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
          {produits.categories.length <= 0 && <span>{error}</span>}
        </section>


        <section className='form'>
          <label>Quantités</label>
          <input className='input-qty' type='number' name='stocks' value={produits.stocks} onChange={(e) => handleChange(e)} placeholder={items?.stocks} />
          {produits.stocks.length <= 0 && <span>{error}</span>}
        </section>


        <button className='btn-save-modif' onClick={() => handlePut(items._id)}>{!alertMessage ? "Modifier" : alertMessage}</button>
        <button className='btn-supp-modif' onClick={() => handledelete(items._id)}>Supprimer</button>
      </section>
    </main>

  );
}

export default SingleProduits;
