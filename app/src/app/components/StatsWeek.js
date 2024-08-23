import moment from 'moment';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatsWeek = ({data}) => {

     // TABLEAU DES JOURS DE LA SEMAINE
  const weekday = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

  // CONVERTIRE LES DONNEES EN MODEL BARDATA
  const chartData = data && data.length > 0 && data.map((row) => {
    const day = parseInt(row.date.split("-")[0], 10); // Extraire le jour du mois
    const dayOfWeek = moment(row.date, "DD-MM-YYYY").isoWeekday(); // Obtenir le jour de la semaine
     console.log(day)
    return {
      label: weekday[dayOfWeek - 1], // Utiliser le jour de la semaine pour obtenir le label correct
      total: row.total,
    };
  });
  return (
    <article className='statsWeekwidget'>
    <h1>Statistiques Hebdomadaire</h1>
    <section style={{ width: 750 , marginTop:5 }}>
    <BarChart width={750} height={250} data={chartData} barSize={25} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="jour" name="Jour" fill="#f0f1f5" />
      <Bar dataKey="total" name="Total" fill="#b3108add" />
    </BarChart>
    </section>
  </article>
  )
}

export default StatsWeek
