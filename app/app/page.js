"use client"

import axios from "axios"
import { useEffect, useState} from "react"
import Tendance from "@/components/Tendance"
import EtatStocks from "@/components/EtatStocks"
import Achats from "@/components/Achats"
import CoutProduct from "@/components/CoutProduct"
import Ventes from "@/components/Ventes"
import Depenses from "@/components/Depenses"
import Revenues from "@/components/Revenues"
import Statstistiques from "@/components/Statstistiques"
import StatGraphique from "@/components/StatGraphique"
import Cout from "@/components/Cout"
import Navbar from "@/components/layouts/Navbar"
import SideBar from "@/components/layouts/SideBar"

export default function Home() {

  const [statsVentes ,setStatsVentes ] = useState([])
  
  
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
      { field: 'total_ventes', headerName: 'Total des ventes', flex: 1 },
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
    <Statstistiques data={statsVentes}  columns={columns} />
    <StatGraphique data={statsVentes} />
    </div>
    <div>
    
    </div>
</section>
</main>
</>
  )
}
