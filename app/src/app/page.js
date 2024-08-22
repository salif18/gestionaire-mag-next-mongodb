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
import Navbar from "./components/layouts/Navbar"
import SideBar from "./components/layouts/SideBar"
import { MyStore } from "./context/store"
import StatsWeek from "./components/StatsWeek"

export default function Home() {

  const {setProduits , setVendues, setBestVendu ,setOpperations } = useContext(MyStore)

  const [statsVentes ,setStatsVentes ] = useState([])

  
  //charger les produits
  useEffect(() => {
    const getProduits =()=>{
    axios
      .get(`/api/produits`)
      .then((response) => {
        setProduits(response.data.produits);
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
        setVendues(response.data.results);
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

    const statsweek = [
      {
        day: "1",
        total: "68728"
      },
      {
        day: "2",
        total: "28728"
      },
      {
        day: "3",
        total: "25898"
      },
      {
        day: "4",
        total: "84729"
      },
      {
        day: "5",
        total: "58998"
      },
      {
        day: "6",
        total: "64728"
      },
      {
        day: "7",
        total: "24728"
      },
  
    ]

    
  return (
    <>
    <Navbar/>
    <main className="App">
    <SideBar/>
    <section className='home'>
    <header className='header-home'>
      <h1>TABLEAU DE RESUME</h1>
    </header>
    <div className='home-container-d'>
     <Tendance/>
     <EtatStocks/>
   </div>
    <div className='home-container-a'>
     <Achats/>
    <CoutProduct/>
    <Ventes/>
    </div>
    <div className='home-container-b'>
    <Cout/>
     <Depenses/>
     <Revenues/>
    </div>
    <div className='home-container-c'>
     <StatsWeek data={statsweek} />
     <Statstistiques data={statsVentes}  columns={columns} />
    </div>
    <div className='home-container-c'>
    <StatGraphique data={statsVentes} />
    </div>
    <div>
    
    </div>
</section>
</main>
</>
  )
}
