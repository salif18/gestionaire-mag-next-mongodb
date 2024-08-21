import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatGraphique = ({ data }) => {
  
  const chartData = data && data.length > 0 ? data.map((row) => ({
    label: row.annee && row.mois ? `${row.annee}-${row.mois}` : 'Inconnu',
    nombreVentes: row.nombre_ventes || 0,
    totalVentes: row.total_ventes || 0,
  })) : [];
  
  return (
    <div className='stats'>
      <h1>Interprétation graphique</h1>
      <div style={{ height: 300, width: 500 }}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='5 5'  />
          <XAxis dataKey='label'  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='nombreVentes' name='Nombre de Ventes' stroke='blue' />
          <Line  type='monotone' dataKey='totalVentes' name='Total des Ventes' stroke='green' />
        </LineChart>
      </div>
    </div>
  );
};

export default StatGraphique;