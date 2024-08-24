"use client"

import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creation de mon context
export const MyStore = createContext();

//la fonction provider
export const MyStoreProvider = (props) => {

  //etats de mes donnees
  const [panier, setPanier] = useState([]);
  const [opperations,setOpperations] = useState([])
  const [errorStock, setErrorStock] = useState("");
  const [message,setMessage] = useState('')
  const [bestVendu,setBestVendu] = useState([])
  const [datePersonaliser,setDatePersonnaliser] = useState('')
  //domaine
  
  //ajout de de nouveau produits
  const handleSave = (item) => {
    axios
      .post(`/api/produits`, item)
      .then((response) => setMessage(response.data.message))
      .catch((err) => console.log(err));
  };

  //incrementation du nombre de produits
  const increment = (item) => {
    const toSale = panier.map((d) =>
      d._id === item._id ? { ...d, qty: d.qty + 1 } : d
    );
    setPanier(toSale);
  };
  //decrementation du nombre de produits
  const decrement = (item) => {
    const toSale = panier.map((d) =>
      d._id === item._id ? { ...d, qty: d.qty - 1 } : d
    );
    setPanier(toSale);
  };

  //ajout des produit dans le panier pour la vente
  const handleAddPanier = (item) => {
    setPanier([...panier, { ...item, qty: 1 }]);
  };
 
 

  //envoyer les depenses
  const sendDepensesToDataBase = (item)=> {
    axios.post(`/api/depenses`,item)
    .then((response) => setMessage(response.data.message))
    .catch((err)=> console.log(err))
  }
   
  
  //calcule des depenses
  const calculeDepenses =()=>{
    const somme = opperations.map((a)=> a.montants );
    const result = somme.reduce((a,b) => a+b,0)
    return result
  }
  const depensesTotal = calculeDepenses()
  

  //reinitialiser etat de message automatiquement apres 3s
  message && setTimeout(()=>{
    setMessage('')
  },2000)


  const contextValue = {
    handleSave: handleSave,
    panier: panier,
    setPanier: setPanier,
    setBestVendu:setBestVendu,
    setOpperations:setOpperations,
    handleAddPanier: handleAddPanier,
    handleVendre: handleVendre,
    increment: increment,
    decrement: decrement,
    errorStock: errorStock,
    opperations:opperations,
    sendDepensesToDataBase:sendDepensesToDataBase,
    depensesTotal:depensesTotal,
    message:message,
    bestVendu:bestVendu,
    setDatePersonnaliser:setDatePersonnaliser,
    datePersonaliser:datePersonaliser
  };

  return (
    <MyStore.Provider value={contextValue}>{props.children}</MyStore.Provider>
  );
};
