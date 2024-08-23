"use client"

import axios from "axios"
import { useContext, useEffect, useState} from "react"
import Tendance from "./components/Tendance"
import EtatStocks from "./components/EtatStocks"
import Achats from "./components/Achats"
import CoutProduct from "./components/CoutProduct"
import Ventes from "./components/Ventes"
import Depenses from "./components/Depenses"
import Revenues from "./components/Revenues"
import Statstistiques from "./components/Statstistiques"
import StatGraphique from "./components/StatGraphique"
import Cout from "./components/Cout"
import { MyStore } from "./context/store"
import StatsWeek from "./components/StatsWeek"

export default function Home() {

  const { setVendues, setBestVendu ,setOpperations } = useContext(MyStore)
  const [ produits , setProduits] = useState([])
  const [statsVentes ,setStatsVentes ] = useState([])
  const [statsWeeks ,setStatsWeeks ] = useState([])
  const [benefice ,setBenefice ] = useState([])
  const [totalVente ,setTotalVente ] = useState([])
  const [totalAchatOfVente ,setTotalAchatOfVente ] = useState([])
  const [totalAchatOfAchat ,setTotalAchatOfAchat ] = useState([])
  //charger les produits
  useEffect(() => {
    const getProduits =()=>{
    axios
      .get(`/api/produits`)
      .then((response) => {
        setProduits(response.data.produits);
        setTotalAchatOfAchat(response.data.totalAchatOfAchat)
      })
      .catch((err) => console.error(err));
    };
    getProduits()
  }, []);

  //charger les ventes
  useEffect(() => {
    const getVente =()=>{
    axios
      .get(`/api/ventes`)
      .then((response) => {
        setBenefice(response.data.benefices);
        setTotalVente(response.data.totalVente);
        setTotalAchatOfVente(response.data.totalAchatOfVente)
      })
      .catch((err) => console.error(err));
    };
    getVente()
  }, []);

  
  //charger les ventes
  useEffect(() => {
    const getVente =()=>{
    axios
      .get(`/api/ventes`)
      .then((response) => {
        setVendues(response.data.results);
      })
      .catch((err) => console.error(err));
    };
    getVente()
  }, []);

  console.log(benefice)
  
  //charger les ventes hebdo
  useEffect(() => {
    const getVente =()=>{
    axios
      .get(`/api/ventes/stats-by-hebdo`)
      .then((response) => {
        setStatsWeeks(response.data.stats);
      })
      .catch((err) => console.error(err));
    };
    getVente()
  }, []);

  


  //charger les depenses
  useEffect(()=>{
      const getDepenses =()=>{
       axios.get(`/api/depenses`)
       .then((res) =>{
        setOpperations(res.data.results)
       }).catch(err => console.error(err))
      };
      getDepenses()
  },[])


  //recuperer les meilleur vente
  useEffect(()=>{
     const getBestVente =()=>{
       axios.get(`/api/ventes/stats-by-categories`)
       .then((res)=>{
        setBestVendu(res.data.results)
       }).catch((err)=>console.error(err))
     };
     getBestVente()
  },[])
  
  useEffect(() => {
      async function fetchSalesStatistics() {
        try {
          const response = await axios.get(`/api/ventes/stats-by-month`);
          if(response){
            setStatsVentes(response.data.results);
          }
          
        } catch (error) {
          console.error('Error fetching sales statistics:', error);
        }
      }
  
      fetchSalesStatistics();
    }, []);

   
    
  
    
    const columns = [
      { field: 'annee', headerName: 'Année', flex: 1 },
      { field: 'mois', headerName: 'Mois', flex: 1 },
      { field: 'nombre_ventes', headerName: 'Nombre de ventes', flex: 1 },
      { field: 'total_ventes', headerName: 'Total', flex: 1 },
    ]

    
    
  return (
    <>
    <main className="dashboard">
    <header className='header-dashboard'>
      <h1>TABLEAU DE RESUME</h1>
    </header>
    <section className='home-row'>
    <StatsWeek data={statsWeeks} />
     <Tendance/>
     <EtatStocks produits ={produits}/>
   </section>
    <section className='home-row'>
     <Achats resultat={totalAchatOfVente + totalAchatOfAchat  }/>
    {/* <CoutProduct/> */}
    <Ventes venteTotal={totalVente}/>
    <Cout benefice ={benefice}/>
    <Depenses/>
    </section>
    <section className='home-row'>
    
     
     {/* <Revenues/> */}
    </section>
    <section className='home-row'>
    <StatGraphique data={statsVentes} />
    <Statstistiques data={statsVentes}  columns={columns} />
    </section>
</main>
</>
  )
}
