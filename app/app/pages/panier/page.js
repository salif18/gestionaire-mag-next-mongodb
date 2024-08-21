"use client"
import React, { useContext} from "react";
import { MyStore } from "@/context/store";
import SideBar from "@/components/layouts/SideBar";
import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/navigation";


const Ventes = () => {
  const router = useRouter()
  const {setDatePersonnaliser,
    datePersonaliser,
    message, panier, increment, decrement, errorStock} = useContext(MyStore)

  
  const handleEnregistreAvecRecu =()=>{
    if(!errorStock){
      router.push('/pages/recus')
    }else{ 
      console.log('err')
      return false
    }
    
  }

  

  return (
    <>
    <Navbar/>
    <main className="App">
    <SideBar/>
    <section className="ventes">
      <header className="header-vente">
        <h1>Enregistrements des ventes</h1>
  {/*<button className="btn-vendues" onClick={()=>navigate('/liste-ventes')}>Ventes effectuees</button>*/}
      </header>
      <div className="vente-container">
        <div className="vente-infos">
          <table>
          <thead>
           <tr className="tr1">
             <th className="th">NOMS</th>
             <th className="th">CATEGORIES</th>
             <th className="th">PRIX D'ACHAT</th>
             <th className="th">PRIX DE VENTE </th>            
             <th className="th">QUANTITES</th>
             <th className="th">SOMME</th>
             <th className="th">AJOUTER UNE DATE</th>
           </tr>
           <tr><th></th><th></th><th></th><th></th><th></th><th></th><th><input className="timestamps" type='date' name='timestamps' value={datePersonaliser} onChange={(e)=>setDatePersonnaliser(e.target.value)} /></th></tr>
          </thead>
         
          {panier.map((item)=>(
            <tbody key={item.id}>
             <tr >
                <th className="th">{item.nom}</th>
                <th className="th">{item.categories}</th>
                <th className="th">{item.prixAchat} FCFA</th>
                <th className="th">{item.prixVente} FCFA</th>
                <th className="th">
                 <button className="btn-incre" onClick={()=>increment(item)}>+</button>
                  { item.qty} 
                 {item.qty > 1 && <button className="btn-decre" onClick={()=>decrement(item)}>-</button>}

                </th>
                <th className="qtys">{item.qty*item.prixVente} FCFA</th>
               
             </tr>
             <tr><th></th><th></th><th></th><th></th><th>{item.stocks < item.qty && <span>Stocks insuffisant</span>}</th><th></th></tr>
          </tbody>))}
          </table>
          
          
        </div>
       {panier.length <= 0 && <span className="panier-vide">Aucuns produits </span>}
      </div>
      
      <div className="btnsss">
      <p className="message-vente">{message}</p>
      {panier.length > 0 && <button className="btn-vente-recu" onClick={()=>handleEnregistreAvecRecu()}>Enregistrer</button>}
      </div>
    </section>
    </main>
    </>
  );
};

export default Ventes;
