"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter} from 'next/navigation';


const SingleProduits = () => {

  const [messages, setMessages] = useState('')
  //etat initial des champs de formulaire
  const [produits, setProduits] = useState({
    nom: "",
    categories: "",
    prixAchat: "",
    prixVente: "",
    stocks: "",
  })

  //etat de stockage d'erreur
  const [error, setError] = useState('')


  //recuperation dune seul donnee selectioner
  const [items, setItems] = useState({})
  const [options ,setOptions ] = useState([])
 

    

  const router = useRouter();
  const { id } = useParams()

  //recuperer le produit de id
  useEffect(() => {
    axios.get(`/api/produits/${id}`)
      .then((res) => {
        setItems(res.data.results)
      }).catch((err) => console.error(err))
  }, [])


     
  //charger les depenses
  useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`/api/categories`)
     .then((res) =>{
      setOptions(res.data.results)
     }).catch(err => console.error(err))
    };
    getDepenses()
},[])

  //changement de etat des champs
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduits({ ...produits, [name]: value })
  }

  //fonction envoie des donnee modifier dans le backend
  const handlePut = (id) => {
    axios.put(`/api/produits/${id}`, produits)
      .then((response) => {
        setMessages(response.data.message)
      }).catch((err) => console.error(err));
    router.push('/pages/produits');
    setProduits({
      nom: "",
      categories: "",
      prixAchat: "",
      prixVente: "",
      stocks: "",
    })
  };


  //supprimer le produit
  const handledelete = (id) => {
    axios.delete(`/api/produits/${id}`)
      .then((res) => {
        setMessages(res.data.message)
      })
      .catch((err) => console.error(err))
  }

  messages && setTimeout(() => {
    setMessages('')
  }, 2000)

  //le rendue vue
  return (

    <main className='single'>
      <section className='header-single'>
        <h1>Modification du produit</h1>
      </section>


      <section className='update-form'>
        <section className='form'>
          <label>Prix d'achats</label>
          <input type='text' name='prixAchat' value={produits.prixAchat} onChange={(e) => handleChange(e)} placeholder={items?.prixAchat} />
          {produits.prixAchat.length <= 0 && <span>{error}</span>}
        </section>

        <section className='form'>
          <label>Prix de ventes</label>
          <input type='number' name='prixVente' value={produits.prixVente} onChange={(e) => handleChange(e)} placeholder={items?.prixVente} />
          {produits.prixVente.length <= 0 && <span>{error}</span>}
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


        <button className='btn-save-modif' onClick={() => handlePut(items._id)}>Modifier</button>
        <button className='btn-supp-modif' onClick={() => handledelete(items._id)}>Supprimer</button>
      </section>
    </main>

  );
}

export default SingleProduits;
