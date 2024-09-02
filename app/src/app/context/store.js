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
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter()
  const publicRoutes = ['/pages/login', '/pages/register'];

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('username');
  
    if (!publicRoutes.includes(router.pathname)) {
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.replace('/pages/home');
      }
    }
  
    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserName(storedUserName);
    setIsLoading(false);
  };
  
  useEffect(() => {
    checkAuth();
    // On n'inclut pas de dépendances pour éviter les redirections multiples
  }, []);
  


  const login = (token, userId, userName) => {
    setToken(token);
    setUserId(userId);
    setUserName(userName)
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', userName);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    sessionStorage.removeItem("sessionToken")
    Cookies.remove('cookiesToken');
    router.replace("/");
  };

  const tokenCookie = Cookies.get('cookiesToken');
  console.log(tokenCookie)

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
    if (existingItem) {
      increment(existingItem);
    } else {
      setPanier([...panier, { ...item, qty: 1 }]);
    }
  };

  // Enregistrer ou effectuer une vente
  const handleVendre = async () => {
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
    handleVendre,
    increment,
    decrement,
    sendDepensesToDataBase,
    message,
    setDatePersonnaliser,
    datePersonaliser,
    login,
    logout,
    token,
    userId,
    userName,
    setUserName
  };

  return (
    <MyStore.Provider value={contextValue}>
      {props.children}
    </MyStore.Provider>

    /* <MyStore.Provider value={contextValue}>
      {isLoading && (!token || publicRoutes.includes(router.pathname)) ? (
        props.children
      ) : (
        <div>Redirecting...</div>
      )}
    </MyStore.Provider> */
  );
}

