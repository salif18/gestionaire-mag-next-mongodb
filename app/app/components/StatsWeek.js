"use client"
import moment from 'moment';
import React, { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatsWeek = ({data}) => {

     // TABLEAU DES JOURS DE LA SEMAINE
  const weekday = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

  // CONVERTIRE LES DONNEES EN MODEL BARDATA
  const chartData = data && data.length > 0 && data.map((row) => {
    const day = parseInt(row.date.split("-")[0], 10); // Extraire le jour du mois
    const dayOfWeek = moment(row.date, "DD-MM-YYYY").isoWeekday(); // Obtenir le jour de la semaine
    return {
      label: weekday[dayOfWeek - 1], // Utiliser le jour de la semaine pour obtenir le label correct
      total: row.total,
    };
  });

  // const [fontSize, setFontSize] = useState(12); // Définir la taille de la police par défaut

  // // Fonction pour ajuster la taille de la police en fonction de la largeur de l'écran
  // const updateFontSize = () => {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth < 600) {
  //     setFontSize(8); // Petite taille de police pour les petits écrans
  //   } else if (screenWidth < 1200) {
  //     setFontSize(10); // Taille intermédiaire pour les écrans moyens
  //   } else {
  //     setFontSize(12); // Taille par défaut pour les écrans larges
  //   }
  // };

  // // Utiliser useEffect pour écouter les changements de taille de la fenêtre
  // useEffect(() => {
  //   updateFontSize(); // Mettre à jour la taille de la police au chargement
  //   window.addEventListener('resize', updateFontSize); // Ajouter un écouteur d'événements sur le redimensionnement de la fenêtre

  //   return () => {
  //     window.removeEventListener('resize', updateFontSize); // Nettoyer l'écouteur lors du démontage du composant
  //   };
  // }, []);

  return (
    <article className='statsWeekwidget'>
    <h1>Statistiques Hebdomadaire</h1>
    <section style={{ width: '100%', height: "250px"}}>
    <ResponsiveContainer width="100%" height="100%">
    <BarChart width={750} height={200} data={chartData} barSize={25} margin={{ top: 20, right: 30, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis tick={{ fontSize:10 }} color='#f0f1f5' /> Modifier la taille de la police ici
      {/* <YAxis /> */}
      <Tooltip />
      <Legend />
      <Bar dataKey="jour" name="Jour" fill="#f0f1f5" />
      <Bar dataKey="total" name="Total" fill="rgb(253, 144, 2)" />
      {/* "#b3108add" */}
    </BarChart>
    </ResponsiveContainer>
    </section>
  </article>
  )
}

export default StatsWeek
