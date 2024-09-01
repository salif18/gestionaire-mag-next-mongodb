"use client"
import React, { useContext, useEffect, useState } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';
import { MyStore } from '../../context/store';
import withAuth from '../../withAuth';

const Rapports = () => {
  const { token, userId} = useContext(MyStore)
  const [vendues, setVendues] = useState([])
  const [dateValue, setDateValue] = useState('');
  const ventesFilter = vendues?.filter((x) => x.date_vente?.includes(dateValue))

  //charger les ventes
  useEffect(() => {
    const getVente = () => {
      axios
        .get(`/api/ventes/${userId}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          setVendues(response.data.results);
        })
        .catch((err) => console.error(err));
    };
    getVente()
  }, [userId, token]);

  const handlePrint = () => {
    window.print()
  }
  //quantite total
  const calulQty = () => {
    const qty = ventesFilter?.map((a) => a.qty);
    const sum = qty.reduce((a, b) => a + b, 0)
    return sum
  }
  const nombre_de_vente = calulQty()

  //calcule somme total
  const calTotal = () => {
    const prix = ventesFilter.map((x) => x.prix_vente * x.qty)
    const sum = prix.reduce((a, b) => parseInt(a) + parseInt(b), 0)
    return sum
  }
  const total = calTotal()

  //calcule benefice totale
  const calculBenefice = (data) => {
    let beneficeTotal = 0;
    for (let x of data) {
      const bene = ((x.prix_vente * x.qty / x.qty) - x.prix_achat) * x.qty;
      console.log(bene);
      beneficeTotal += bene
    }
    return beneficeTotal;
  }
  const beneficeTotal = calculBenefice(ventesFilter);

  const datevente = ventesFilter[0]


  return (


    <main className='rapports'>
      <header className='header-rapport'>
        <h1>Rapports</h1>
      </header>

      <section className='filtre'>
        <label>Rapports du </label>
        <input type='date' value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
      </section>
      <section className='tableau-de-vente'>


        <table className='table'>
          <thead className='head_1'>
            <tr className='li_1'>
              <th className='co'>NOMS</th>
              <th className='co'>CATEGORIES</th>
              <th className='co'>PRIX D'ACHAT UNITAIRE</th>
              <th className='co'>PRIX DE VENTE UNITAIRE</th>
              <th className='co'>QUANTITES</th>
              <th className='co'>SOMMES</th>
              <th className='co'>BENEFICES</th>
            </tr>
          </thead>
          {ventesFilter.map((item) => (
            <tbody key={item._id}>
              <tr className='li_2' >
                <th className='co2'>{item.nom}</th>
                <th className='co2'>{item.categories}</th>
                <th className='co2'>{item.prix_achat} FCFA</th>
                <th className='co2'>{item.prix_vente} FCFA</th>
                <th className='co2'>{item.qty}</th>
                <th className='co2'>{item.prix_vente * item.qty} FCFA</th>
                <th className='co2'>{((item.prix_vente * item.qty / item.qty) - item.prix_achat) * item.qty} FCFA</th>
              </tr>

            </tbody>))}
          <tfoot></tfoot>
        </table>

      </section>

      <section className='infos-ventes'>
        <section className='nombr'>
          <p>NOMBRE DE PRODUITS VENDUS</p><span>{nombre_de_vente}</span>
        </section>
        <section className='tot'>
          <p>LA SOMME TOTALE</p><span>{total} FCFA</span>
        </section>
        <section className='bene'>
          <p>LE BENEFICE TOTAL</p><span>{beneficeTotal} FCFA</span>
        </section>
        <p>Rapports {dateValue ? `du ${new Date(datevente?.date_vente).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}`  : "de tous les ventes"}</p>
        <button className='btn-print' onClick={() => handlePrint()}><PrintIcon style={{ marginRight: 10 }} /> Imprimer</button>
      </section>

    </main>

  );
}

export default withAuth(Rapports);
