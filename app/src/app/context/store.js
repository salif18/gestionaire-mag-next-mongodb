"use client"

import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creation de mon context
export const MyStore = createContext();

//la fonction provider
export const MyStoreProvider = (props) => {

  //etats de mes donnees
  const [produits, setProduits] = useState([]);
  const [vendues, setVendues] = useState([]);
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

  console.log(panier)
 
  //enregistrer ou effectuer une vente
  const handleVendre = () => {
    panier.map((item) => {
      axios
        .post(`/api/ventes`,datePersonaliser ? {...item, timestamps:datePersonaliser} : item)
        .then((response) => {
          setMessage(response.data.message)
        })
        .catch((err) => console.log(err));
      
    });
  };

  //envoyer les depenses
  const sendDepensesToDataBase = (item)=> {
    axios.post(`/api/depenses`,item)
    .then((response) => setMessage(response.data.message))
    .catch((err)=> console.log(err))
  }
   

  //calcule vente total
  const calVenteTotal = () => {
    const prix = vendues.map((x) => x.prixVente * x.qty);
    const sum = prix.reduce((a, b) => a + b, 0);
    return sum;
  };
  let venteTotal = calVenteTotal();

  //calcule benefice totale
  const calculBenefice = (data) => {
    let beneficeTotal = 0;
    for (let x of data) {
      const bene = ((x.prixVente * x.qty) / x.qty - x.prixAchat) * x.qty;
      beneficeTotal += bene;
    }
    return beneficeTotal;
  };
  let beneficeGeneral = calculBenefice(vendues);

  //calcule achat total de stock
  const achat = ()=>{
     const prixAchat = produits.map((x) => x.prixAchat * x.stocks);
     const sum = prixAchat.reduce((a, b) => a + b, 0);
     return sum
  }
  const sumAchat = achat()
  
  //calcul achat total de vente
  const vente =()=>{
     const forvendue = vendues && vendues.map((x) => x.prixAchat * x.qty);
     const sum = forvendue.reduce((a, b) => a + b, 0);
     return sum
  }
  const sumVente = vente()
 
  //calcule achat total de produit
  const calculAchatTotal = (a,b) => {
    const total = a + b;
    return total;
  };
  const achatTotal = calculAchatTotal(sumVente,sumAchat);

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
    produits: produits,
    setProduits: setProduits,
    handleSave: handleSave,
    panier: panier,
    setPanier: setPanier,
    vendues: vendues,
    setVendues: setVendues,
    setBestVendu:setBestVendu,
    setOpperations:setOpperations,
    handleAddPanier: handleAddPanier,
    handleVendre: handleVendre,
    increment: increment,
    decrement: decrement,
    beneficeGeneral: beneficeGeneral,
    venteTotal: venteTotal,
    achatTotal: achatTotal,
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
