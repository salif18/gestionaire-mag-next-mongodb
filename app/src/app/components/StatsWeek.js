import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatsWeek = ({data}) => {

     // TABLEAU DES JOURS DE LA SEMAINE
  const weekday = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

  // CONVERTIRE LES DONNEES EN MODEL BARDATA
  const chartData = data && data.length > 0 && data.map((row) => ({
    label: `${weekday[row.day -1]}`,
    total: row.total,
  }));
  return (
    <article className='widget4'>
    <h1>Statistiques Hebdomadaire</h1>
    <section style={{ width: 750 , marginTop:5 }}>
    <BarChart width={750} height={200} data={chartData} barSize={25} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
