"use client"

import axios from "axios"
import { Suspense, useEffect, useState } from "react"
import Tendance from "../../components/Tendance"
import EtatStocks from "../../components/EtatStocks"
import Achats from "../../components/Achats"
import CoutProduct from "../../components/CoutProduct"
import Ventes from "../../components/Ventes"
import Depenses from "../../components/Depenses"
import Revenues from "../../components/Revenues"
import Statstistiques from "../../components/Statstistiques"
import StatGraphique from "../../components/StatGraphique"
import Cout from "../../components/Cout"
import StatsWeek from "../../components/StatsWeek"
import Loading from "../../loading"

import Cookies from "js-cookie"
import { config as configDotenv } from "dotenv";
import withAuth from "@/app/withAuth"
configDotenv();

  const  Home = () =>{
  const [produits, setProduits] = useState([])
  const [statsVentes, setStatsVentes] = useState([])
  const [statsWeeks, setStatsWeeks] = useState([])
  const [bestVendu, setBestVendu] = useState([])
  const [benefice, setBenefice] = useState(0)
  const [totalVente, setTotalVente] = useState(0)
  const [totalAchatOfVente, setTotalAchatOfVente] = useState(0)
  const [totalAchatOfAchat, setTotalAchatOfAchat] = useState(0)
  const [depensesTotal , setDepensesTotal] = useState(0)
  const [prix_achatGlobal, setPrix_achatGlobal] = useState(0)
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");
 

  //charger les produits
  useEffect(() => {
   
    const getProduits = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_URI}/products/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProduits(response.data.produits);
          setTotalAchatOfAchat(response.data.totalAchatOfAchat)
        })
        .catch((err) => console.error(err));
    };
    getProduits()
  }, [userId, token]);

//charger les ventes
useEffect(() => {
  const getVente =()=>{
  axios
    .get(`${process.env.NEXT_PUBLIC_URI}/ventes/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = response.data;
      setBenefice(data.benefice_total);
      setTotalVente(data.total_vente);
      setTotalAchatOfVente(data.totalAchatOfVente)
    
    })
    .catch((err) => console.error(err));
  };
  getVente()
}, [userId, token]);

  //charger les ventes hebdo
  useEffect(() => {
    const getVente = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_URI}/ventes/stats-by-hebdo/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          setStatsWeeks(response.data.stats);
        })
        .catch((err) => console.error(err));
    };
    getVente()
  }, [userId, token]);

  //charger les depenses
  useEffect(() => {
    const getDepenses = () => {
      axios.get(`${process.env.NEXT_PUBLIC_URI}/depenses/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          setDepensesTotal(res.data.depensesTotal)
        }).catch(err => console.error(err))
    };
    getDepenses()
  }, [userId, token])


  //recuperer les meilleur vente
  useEffect(() => {
    const getBestVente = () => {
      axios.get(`${process.env.NEXT_PUBLIC_URI}/ventes/stats-by-categories/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          setBestVendu(res.data.results)
        }).catch((err) => console.error(err))
    };
    getBestVente()
  }, [userId, token])

  useEffect(() => {
    async function fetchSalesStatistics() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URI}/ventes/stats-by-month/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response) {
          setStatsVentes(response.data.results);
        }

      } catch (error) {
        console.error('Error fetching sales statistics:', error);
      }
    }

    fetchSalesStatistics();
  }, [userId, token]);

  const columns = [
    { field: 'annee', headerName: 'Année', flex: 1 },
    { field: 'mois', headerName: 'Mois', flex: 1 },
    { field: 'nombre_ventes', headerName: 'Nombre de ventes', flex: 1 },
    { field: 'total_ventes', headerName: 'Total', flex: 1 },
  ]


useEffect(() => {
    const calculatedResult = totalAchatOfVente + totalAchatOfAchat;
    setPrix_achatGlobal(calculatedResult);
}, [depensesTotal, benefice]);

  return (
    
    <Suspense fallback={<Loading/>}>
      <main className="dashboard">
        <header className='header-dashboard'>
          <h1>TABLEAU DE RESUME</h1>
        </header>
        <section className='home-row'>
        
          <StatsWeek data={statsWeeks} />
          <Tendance bestVendu={bestVendu}/>
          <EtatStocks produits={produits} />
    
        </section>
        <section className='home-row'>
          <Achats resultat={prix_achatGlobal || 0} />
          <Ventes venteTotal={totalVente } />
          <Cout benefice={benefice } />
          
        </section>
        <section className='home-row'>
        {/* <CoutProduct/> */}
          <Depenses depensesTotal ={depensesTotal}/>
          <Revenues depensesTotal ={depensesTotal} benefice={benefice} />
        </section>
        <section className='home-row'>
          <StatGraphique data={statsVentes} />
          <Statstistiques data={statsVentes} columns={columns} />
        </section>
      </main>
      </Suspense>
    
  )
}

export default withAuth(Home)