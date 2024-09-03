"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Création de mon context
export const MyStore = createContext();

// La fonction provider
export const MyStoreProvider = (props) => {
  // États de mes données
  const [panier, setPanier] = useState([]);
  const [message, setMessage] = useState('');
  const [datePersonaliser, setDatePersonnaliser] = useState('');

  const router = useRouter()

  const logout = () => {
    sessionStorage.removeItem("sessionToken")
    Cookies.remove('cookiesToken');
    Cookies.remove('cookiesUserId');
    Cookies.remove('userName');
    router.replace("/");
  };



  // Incrémentation du nombre de produits
  const increment = (item) => {
    const toSale = panier.map((d) =>
      d._id === item._id ? { ...d, qty: d.qty + 1 } : d
    );
    setPanier(toSale);
  };

  // Décrémentation du nombre de produits
  const decrement = (item) => {
    const toSale = panier.map((d) =>
      d._id === item._id ? { ...d, qty: d.qty - 1 } : d
    );
    setPanier(toSale);
  };

  // Ajout des produit dans le panier pour la vente
  const handleAddPanier = (item) => {
    const existingItem = panier.find((d) => d._id === item._id);
    let newPanier;
  
    if (existingItem) {
      newPanier = panier.map((d) =>
        d._id === item._id ? { ...d, qty: d.qty + 1 } : d
      );
    } else {
      newPanier = [...panier, { ...item, qty: 1 }];
    }
  
    setPanier(newPanier);
  };
  

  // Synchroniser le panier avec localStorage à chaque fois qu'il est mis à jour
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);


  const handleRemovePanier = (id) => {
    const newpanier = panier.filter((item) => item._id !== id)
    setPanier(newpanier)
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  // Enregistrer ou effectuer une vente
  const handleVendre = async () => {
    const userId = Cookies.get("cookiesUserId");
    const token = Cookies.get("cookiesToken");
    try {
      const promises = panier.map((item) => {
        return axios.post(`/api/ventes`, datePersonaliser ? { userId, ...item, date_vente: datePersonaliser } : { userId, ...item },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      });

      const responses = await Promise.all(promises);

      const messages = responses.map((response) => response.data.message);
      setMessage(messages.join('\n'));

    } catch (error) {
      console.error('Erreur lors de la gestion des ventes:', error);
      setMessage('Une erreur s\'est produite lors de l\'enregistrement des ventes.');
    }
  };

  // Envoyer les dépenses
  const sendDepensesToDataBase = async (item) => {
    const userId = Cookies.get("cookiesUserId");
    const token = Cookies.get("cookiesToken");
    try {
      const response = await axios.post(`/api/depenses`, { userId, ...item },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      setMessage(response.data.message);
    } catch (err) {
      console.error('Erreur lors de l\'envoi des dépenses:', err);
    }
  };

 
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const contextValue = {
    panier,
    setPanier,
    handleAddPanier,
    handleRemovePanier,
    handleVendre,
    increment,
    decrement,
    sendDepensesToDataBase,
    message,
    setDatePersonnaliser,
    datePersonaliser,
    logout,
  };

  return (
    <MyStore.Provider value={contextValue}>
      {props.children}
    </MyStore.Provider>
  );
}

